import Image from 'next/image'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const HIGHLIGHTS = [
  'Risk-takers',
  'Fast Learners',
  'Problem Solvers',
  'Industry Experts',
  'High-Performers',
  'Innovators',
]

export default function Careers() {
  return (
    <section id="careers" className="careers-section">

      {/* ── Image column ── */}
      <div className="careers-img-col reveal">
        <Image
          src={`${BASE}/Hero5.png`}
          alt="Careers at OctaUnitech — team collaboration"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="careers-img"
        />
        {/* Gradient overlay for text legibility on mobile */}
        <div className="careers-img-overlay" aria-hidden="true" />
      </div>

      {/* ── Content column ── */}
      <div className="careers-content reveal">
        <div className="section-eyebrow">Careers at OctaUnitech</div>

        <h2 className="careers-title">
          Make Work,{' '}
          <em className="careers-accent">Play.</em>
        </h2>

        <p className="careers-body">
          At OctaUnitech, we tackle complex challenges, work hard, high-five and celebrate.
          We&apos;re risk-takers, fast learners, and experts in our fields. Together,
          we&apos;re redefining an industry in desperate need of a shakeup.
        </p>

        <p className="careers-body">
          Get ready for applause, contagious excitement, and out-of-the-box brainstorming sessions.
        </p>

        {/* Highlight tags */}
        <div className="careers-tags">
          {HIGHLIGHTS.map((tag) => (
            <span key={tag} className="careers-tag">{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="careers-cta">
          <span className="careers-cta-label">We are recruiting — share your profile at</span>
          <a href="mailto:career@octaunitech.com" className="careers-email">
            career@octaunitech.com
          </a>
        </div>
      </div>

    </section>
  )
}
