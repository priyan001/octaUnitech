'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    eyebrow: 'Est. 2010 · Bangalore, India',
    preAccent: 'Welcome to',
    accent: 'the New',
    sub: 'We constantly strive in exceeding customer expectations and to be the trusted extended enterprise of our customer by building relationships through strong values, commitment and high standards of support.',
    primaryBtn:   { label: 'Request a Consultation', href: '#contact' },
    secondaryBtn: { label: 'Explore Services →',     href: '#services' },
    image: '/Hero1.png',
    imageAlt: 'Welcome to OctaUnitech',
  },
  {
    eyebrow: 'Cloud Computing',
    preAccent: '',
    accent: 'Cloud Services',
    sub: 'Our cloud solutions enable organizations to reduce IT resource requirements and improve productivity, in addition to lowering costs and reducing the time-to-market.',
    primaryBtn:   { label: 'Explore Cloud Solutions', href: '#services' },
    secondaryBtn: { label: 'Contact Us →',            href: '#contact' },
    image: '/Hero2.png',
    imageAlt: 'Cloud Services',
  },
  {
    eyebrow: 'DevOps & Automation',
    preAccent: '',
    accent: 'DevOps Consulting',
    sub: "Fast-paced development and quicker time-to-market are the two key factors deciding the success of any firm in today's IT industry — and we tackle both with proven DevOps practices.",
    primaryBtn:   { label: 'Start Your DevOps Journey', href: '#contact' },
    secondaryBtn: { label: 'Our Approach →',            href: '#services' },
    image: '/Hero3.png',
    imageAlt: 'DevOps Consulting',
  },
  {
    eyebrow: 'Careers at OctaUnitech',
    preAccent: '',
    accent: 'Work with Us',
    sub: "At OctaUnitech, we make work play. We tackle complex challenges, work hard, high-five and celebrate. We're risk-takers, fast learners, and experts in our fields. Together, we're redefining an industry in desperate need of a shakeup.",
    primaryBtn:   { label: 'View Open Positions', href: '/careers' },
    secondaryBtn: { label: 'Our Culture →',       href: '/about' },
    image: '/Hero4.png',
    imageAlt: 'Work with Us at OctaUnitech',
  },
]

const DURATION = 5000

// ─── Hero component ───────────────────────────────────────────────────────────

export default function Hero() {
  const [current, setCurrent]   = useState(0)
  const [paused, setPaused]     = useState(false)
  const [resetKey, setResetKey] = useState(0)

  // Auto-advance; resetKey restarts the 5 s window after manual navigation
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, DURATION)
    return () => clearInterval(timer)
  }, [paused, resetKey])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setResetKey(k => k + 1)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
    setResetKey(k => k + 1)
  }, [])

  const handleNext = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length)
    setResetKey(k => k + 1)
  }, [])

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-grid" />

      {/* ── Carousel ── */}
      <div className="hero-carousel">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide${i === current ? ' active' : ''}`}
          >
            {/* LEFT — text */}
            <div className="hero-slide-text">
              <div className="hero-eyebrow">{slide.eyebrow}</div>

              <h1 className="hero-title">
                {slide.preAccent && (
                  <>{slide.preAccent}<br /></>
                )}
                <span className="accent-line">{slide.accent}</span>
              </h1>

              <p className="hero-sub">{slide.sub}</p>

              <div className="hero-actions">
                <Link href={slide.primaryBtn.href} className="btn-primary">
                  {slide.primaryBtn.label}
                </Link>
                <Link href={slide.secondaryBtn.href} className="btn-ghost">
                  {slide.secondaryBtn.label}
                </Link>
              </div>
            </div>

            {/* RIGHT — image */}
            <div className="hero-slide-img">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Navigation ── */}
      <div className="carousel-nav">
        <button
          className="carousel-arrow"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ←
        </button>

        <div className="carousel-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="carousel-arrow"
          onClick={handleNext}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* ── Progress bar — key rerenders on slide change, restarting animation ── */}
      <div className="carousel-progress">
        <div
          className={`carousel-progress-fill${paused ? ' paused' : ''}`}
          key={current}
        />
      </div>

      {/* ── Stats strip ── */}
      <div className="stats-strip">
        <div className="stat">
          <div className="stat-num">13<span>+</span></div>
          <div className="stat-label">Years of Excellence</div>
        </div>
        <div className="stat">
          <div className="stat-num">200<span>+</span></div>
          <div className="stat-label">Projects Delivered</div>
        </div>
        <div className="stat">
          <div className="stat-num">50<span>+</span></div>
          <div className="stat-label">Enterprise Clients</div>
        </div>
        <div className="stat">
          <div className="stat-num">F<span>500</span></div>
          <div className="stat-label">Trusted Partners</div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
