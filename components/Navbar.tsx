'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const megaServices = [
  {
    name: 'Cloud Services',
    desc: 'Infrastructure, BCP/DR, Managed & Private Cloud',
    href: '#services',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 18a5 5 0 0 0-1-9.9A7 7 0 1 0 5 15.5" />
        <path d="M10 22h8M12 26h4" />
      </svg>
    ),
  },
  {
    name: 'DevOps Consulting',
    desc: 'CI/CD pipelines, automation, team velocity',
    href: '#services',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="14" r="3" />
        <circle cx="21" cy="7" r="3" />
        <circle cx="21" cy="21" r="3" />
        <path d="M10 14h4l3-7" />
        <path d="M10 14h4l3 7" />
      </svg>
    ),
  },
  {
    name: 'Digital Transformation',
    desc: 'Intelligent automation & data-driven decision making',
    href: '#services',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="14 3 24 8.5 24 19.5 14 25 4 19.5 4 8.5" />
        <circle cx="14" cy="14" r="3" />
        <line x1="14" y1="11" x2="14" y2="3.5" />
      </svg>
    ),
  },
  {
    name: 'System Integration',
    desc: 'Seamless connectivity across your enterprise ecosystem',
    href: '#services',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="2.5" />
        <circle cx="21" cy="7" r="2.5" />
        <circle cx="7" cy="21" r="2.5" />
        <circle cx="21" cy="21" r="2.5" />
        <line x1="9.5" y1="7" x2="18.5" y2="7" />
        <line x1="7" y1="9.5" x2="7" y2="18.5" />
        <line x1="21" y1="9.5" x2="21" y2="18.5" />
        <line x1="9.5" y1="21" x2="18.5" y2="21" />
        <line x1="9.5" y1="9.5" x2="18.5" y2="18.5" />
      </svg>
    ),
  },
  {
    name: 'ML / AI / Analytics',
    desc: 'Unlock insights, build self-improving processes',
    href: '#services',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="14" r="2" />
        <circle cx="14" cy="7" r="2" />
        <circle cx="21" cy="14" r="2" />
        <circle cx="14" cy="21" r="2" />
        <circle cx="14" cy="14" r="3" />
        <line x1="9" y1="14" x2="11" y2="14" />
        <line x1="14" y1="10" x2="14" y2="11" />
        <line x1="17" y1="14" x2="19" y2="14" />
        <line x1="14" y1="17" x2="14" y2="19" />
      </svg>
    ),
  },
  {
    name: 'Consulting Services',
    desc: 'Strategy, software development & mobile apps',
    href: '#services',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="22" height="14" rx="2" />
        <path d="M18 10V8a4 4 0 0 0-8 0v2" />
        <line x1="3" y1="17" x2="25" y2="17" />
        <circle cx="14" cy="21" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navHeight = scrolled ? 70 : 80

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }

  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160)
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="nav-logo-img">
          {logoError ? (
            <span className="nav-logo-text">
              Octa<span>Unitech</span>
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.png`}
              alt="OctaUnitech"
              className="nav-logo-png"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        <ul className="nav-links">
          <li><Link href="#about">About</Link></li>
          <li
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className={megaOpen ? 'mega-active' : ''}
          >
            <button type="button">
              Services <span className="nav-chevron">▾</span>
            </button>
          </li>
          <li><Link href="#why">Why Us</Link></li>
          <li><Link href="#careers">Careers</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>

        <Link href="#contact" className="nav-cta" data-chat-trigger="true">
          Talk to an Expert
        </Link>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mega Menu */}
      <div
        className={`mega-menu ${megaOpen ? 'open' : ''}`}
        style={{ top: navHeight }}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
      >
        {megaServices.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className="mega-item"
            onClick={() => setMegaOpen(false)}
          >
            <div className="mega-icon">{s.icon}</div>
            <div>
              <div className="mega-text-name">{s.name}</div>
              <div className="mega-text-desc">{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Full-screen Menu */}
      {mobileOpen && (
        <div className="mobile-menu open">
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            ✕
          </button>
          <Link href="#about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="#services" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="#why" onClick={() => setMobileOpen(false)}>Why Us</Link>
          <Link href="#careers" onClick={() => setMobileOpen(false)}>Careers</Link>
          <Link href="#contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="#contact" className="btn-primary" data-chat-trigger="true" onClick={() => setMobileOpen(false)}>
            Talk to an Expert
          </Link>
        </div>
      )}
    </>
  )
}
