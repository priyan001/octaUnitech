'use client'

export default function CTA() {
  return (
    <section id="contact" className="cta-section reveal">
      <div className="cta-inner">
        <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '20px' }}>
          Get In Touch
        </div>
        <h2 className="cta-title">
          Ready to Transform<br />Your IT Infrastructure?
        </h2>
        <p className="cta-sub">
          Talk to one of our cloud and DevOps experts. We&apos;ll assess your current
          environment and suggest a roadmap tailored to your business goals — at
          no obligation.
        </p>
        <div className="cta-actions">
          <button type="button" className="btn-primary" data-chat-trigger="true">
            Talk to an Expert →
          </button>
          <a href="#services" className="btn-ghost">
            View Services
          </a>
        </div>
        <div className="cta-contact-info">
          <div>📍 #21 Oxford Towers, 139 HAL Old Airport Road, Kodihalli, Bangalore – 560008</div>
          <div>
            ✉️{' '}
            <a href="mailto:sales@octaunitech.com">sales@octaunitech.com</a>
          </div>
        </div>
      </div>
    </section>
  )
}
