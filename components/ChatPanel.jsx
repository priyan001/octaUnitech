'use client'

import { useState, useEffect, useRef } from 'react'
import styles from '../styles/ChatPanel.module.css'

/* ── Service catalogue ─────────────────────────────────────── */
const SERVICES = [
  {
    id: 'cloud',
    emoji: '☁️',
    label: 'Cloud Services',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'infrastructure'],
    desc: 'We deliver scalable cloud infrastructure on AWS, Azure, and Google Cloud. From seamless migrations to fully managed environments, we optimise costs and performance so your teams can focus on growth.',
  },
  {
    id: 'devops',
    emoji: '⚙️',
    label: 'DevOps Consulting Services',
    keywords: ['devops', 'dev ops', 'ci', 'cd', 'pipeline', 'kubernetes', 'docker'],
    desc: 'Our DevOps engineers design end-to-end CI/CD pipelines, containerise workloads with Docker and Kubernetes, and automate infrastructure provisioning — dramatically accelerating your release cadence.',
  },
  {
    id: 'digital',
    emoji: '🚀',
    label: 'Digital Transformation',
    keywords: ['digital', 'transformation', 'automation', 'modernisation', 'modernization'],
    desc: 'We help enterprises reimagine business processes through intelligent automation and data-driven decision-making, delivering measurable outcomes and improved customer experiences.',
  },
  {
    id: 'integration',
    emoji: '🔗',
    label: 'System Integration',
    keywords: ['integration', 'erp', 'crm', 'api', 'connect', 'middleware'],
    desc: 'OctaUnitech seamlessly connects disparate enterprise systems — ERP, CRM, APIs, and third-party platforms — into a unified ecosystem that eliminates silos and streamlines operations.',
  },
  {
    id: 'consulting',
    emoji: '💡',
    label: 'Consulting Services',
    keywords: ['consulting', 'strategy', 'advisory', 'roadmap', 'architecture'],
    desc: 'Our strategic IT consulting aligns your technology investments with business goals. From cloud strategy and architecture reviews to digital roadmaps, we guide every step of the journey.',
  },
]

/* ── Helpers ────────────────────────────────────────────────── */
const now = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const mkBot = (text) => ({ id: crypto.randomUUID(), role: 'bot', text, time: now() })
const mkUser = (text) => ({ id: crypto.randomUUID(), role: 'user', text, time: now() })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ── Component ──────────────────────────────────────────────── */
export default function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState('idle')       // idle | services | email | done
  const [typing, setTyping] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [servicesVisible, setServicesVisible] = useState(false)
  const [txStatus, setTxStatus] = useState(null)  // null | 'sent' | 'failed'

  const stepRef = useRef('idle')
  const msgsRef = useRef([])          // always mirrors messages state
  const timersRef = useRef([])        // pending bot-typing timeouts
  const endRef = useRef(null)
  const inputRef = useRef(null)

  /* Keep msgsRef in sync */
  const pushMsg = (msg) => {
    setMessages((prev) => {
      const next = [...prev, msg]
      msgsRef.current = next
      return next
    })
    setTyping(false)
  }

  /* Schedule a bot reply after a typing-indicator delay */
  const botAfter = (fn, ms = 900) => {
    setTyping(true)
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id)
      fn()
    }, ms)
    timersRef.current.push(id)
  }

  /* Advance step — keeps ref in sync */
  const advance = (s) => {
    setStep(s)
    stepRef.current = s
  }

  /* Close + cancel pending timers */
  const handleClose = () => {
    setOpen(false)
    setTyping(false)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  /* ── Trigger: click any [data-chat-trigger] or #talkToExpertBtn ── */
  useEffect(() => {
    const onTrigger = (e) => {
      e.preventDefault()
      setOpen(true)
    }
    const els = document.querySelectorAll('[data-chat-trigger], #talkToExpertBtn')
    els.forEach((el) => el.addEventListener('click', onTrigger))
    return () => els.forEach((el) => el.removeEventListener('click', onTrigger))
  }, [])

  /* ── Escape key ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── Scroll to bottom on new content ── */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, servicesVisible])

  /* ── Greeting flow — runs once on first open ── */
  useEffect(() => {
    if (!open || stepRef.current !== 'idle') return

    advance('greeting')

    botAfter(() => {
      pushMsg(mkBot('👋 Welcome to OctaUnitech! How may I help you today?'))
      botAfter(() => {
        pushMsg(mkBot('Please select a service below, or simply type your question:'))
        advance('services')
        setServicesVisible(true)
        inputRef.current?.focus()
      }, 800)
    }, 650)
  }, [open])

  /* ── Ask for email ── */
  const askEmail = () => {
    pushMsg(mkBot("Please provide your email address and we'll have someone contact you shortly."))
    advance('email')
    setServicesVisible(false)
  }

  /* ── Handle service selection ── */
  const pickService = (service) => {
    if (stepRef.current !== 'services' || disabled) return
    setServicesVisible(false)
    pushMsg(mkUser(service.label))
    botAfter(() => {
      pushMsg(mkBot(`${service.emoji} **${service.label}**\n\n${service.desc}`))
      botAfter(() => askEmail(), 900)
    }, 900)
  }

  /* ── Send transcript via API ── */
  const sendTranscript = async (email) => {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: msgsRef.current,
          visitorEmail: email,
        }),
      })
      setTxStatus(res.ok ? 'sent' : 'failed')
    } catch {
      setTxStatus('failed')
    }
  }

  /* ── Process text input based on current step ── */
  const processInput = (text) => {
    const s = stepRef.current

    if (s === 'services') {
      setServicesVisible(false)
      const lower = text.toLowerCase()
      const match = SERVICES.find((svc) =>
        svc.keywords.some((k) => lower.includes(k)) ||
        lower.includes(svc.label.toLowerCase())
      )
      if (match) {
        botAfter(() => {
          pushMsg(mkBot(`${match.emoji} **${match.label}**\n\n${match.desc}`))
          botAfter(() => askEmail(), 900)
        }, 900)
      } else {
        botAfter(() => {
          pushMsg(mkBot('Our team would love to help with that! Let me connect you with an expert.'))
          botAfter(() => askEmail(), 800)
        }, 900)
      }
      return
    }

    if (s === 'email') {
      if (!EMAIL_RE.test(text)) {
        botAfter(() => {
          pushMsg(mkBot("That doesn't look right — could you re-enter your email? (e.g. name@company.com)"))
        }, 800)
        return
      }

      const email = text
      botAfter(() => {
        pushMsg(
          mkBot(
            `✅ Thank you! Our team will reach out to you at **${email}** shortly.\n\nFor urgent queries, contact sales@octaunitech.com — Have a great day! 🌟`
          )
        )
        advance('done')
        setDisabled(true)
        sendTranscript(email)
      }, 900)
    }
  }

  /* ── Send button / Enter key ── */
  const handleSend = () => {
    const text = input.trim()
    if (!text || disabled || stepRef.current === 'idle' || stepRef.current === 'greeting') return
    setInput('')
    pushMsg(mkUser(text))
    processInput(text)
  }

  /* ── Render helpers ── */
  const renderBubbleText = (text) =>
    text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <p key={i} style={{ margin: '2px 0' }}>
          {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        </p>
      )
    })

  return (
    <>
      {/* ── Overlay ── */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Sliding Panel ── */}
      <aside
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with OctaUnitech Support"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.onlineDot} aria-hidden="true" />
            <div>
              <div className={styles.headerTitle}>OctaUnitech Support</div>
              <div className={styles.headerStatus}>Online</div>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close chat panel"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className={styles.body} role="log" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgRowUser : ''}`}
            >
              <div
                className={`${styles.bubble} ${
                  msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot
                }`}
              >
                {renderBubbleText(msg.text)}
                <span className={styles.timestamp}>{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className={styles.msgRow}>
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typingBubble}`}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </div>
          )}

          {/* Service buttons */}
          {servicesVisible && (
            <div className={styles.serviceBtns}>
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  className={styles.serviceBtn}
                  onClick={() => pickService(s)}
                  type="button"
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Transcript status */}
          {txStatus && (
            <p className={txStatus === 'sent' ? styles.statusOk : styles.statusErr}>
              {txStatus === 'sent'
                ? '✅ Transcript sent to our team.'
                : '⚠️ Could not send transcript — please email us directly at sales@octaunitech.com'}
            </p>
          )}

          <div ref={endRef} />
        </div>

        {/* Input footer */}
        <div className={styles.footer}>
          <input
            ref={inputRef}
            className={styles.chatInput}
            type="text"
            placeholder={disabled ? 'Conversation ended' : 'Type a message…'}
            value={input}
            disabled={disabled}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
            aria-label="Chat message input"
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            aria-label="Send message"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}
