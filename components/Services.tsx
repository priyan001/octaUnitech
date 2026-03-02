import Link from 'next/link'

const services = [
  {
    num: '01',
    name: 'Cloud Services',
    desc: 'Infrastructure, Application, Advisory, BCP/DR, Managed Services, and Private/Hybrid Cloud solutions that reduce costs and accelerate time-to-market.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 28a7 7 0 0 0-1.5-13.9A11 11 0 1 0 8 22a7 7 0 0 0 7 8h17a4 4 0 0 0 2-8" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'DevOps Consulting',
    desc: 'Culture-driven IT transformation with CI/CD pipelines, automation, and enhanced team collaboration for faster, more reliable product delivery.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="22" r="5" />
        <circle cx="33" cy="11" r="5" />
        <circle cx="33" cy="33" r="5" />
        <path d="M16 21h7l5-10" />
        <path d="M16 23h7l5 10" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Digital Transformation',
    desc: 'End-to-end business transformation using digital capabilities, intelligent automation, and data-driven decision making strategies.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 4 38 13 38 31 22 40 6 31 6 13" />
        <circle cx="22" cy="22" r="5" />
        <line x1="22" y1="17" x2="22" y2="5" />
        <line x1="27" y1="25" x2="37" y2="31" />
        <line x1="17" y1="25" x2="7" y2="31" />
      </svg>
    ),
  },
  {
    num: '04',
    name: 'System Integration',
    desc: 'End-to-end IT Infrastructure solutions with best-in-class technology partnerships, ensuring seamless connectivity across your enterprise ecosystem.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="4" />
        <circle cx="33" cy="11" r="4" />
        <circle cx="11" cy="33" r="4" />
        <circle cx="33" cy="33" r="4" />
        <circle cx="22" cy="22" r="4" />
        <line x1="15" y1="11" x2="29" y2="11" />
        <line x1="11" y1="15" x2="11" y2="29" />
        <line x1="33" y1="15" x2="33" y2="29" />
        <line x1="15" y1="33" x2="29" y2="33" />
        <line x1="15" y1="15" x2="19" y2="19" />
        <line x1="29" y1="15" x2="25" y2="19" />
        <line x1="15" y1="29" x2="19" y2="25" />
        <line x1="29" y1="29" x2="25" y2="25" />
      </svg>
    ),
  },
  {
    num: '05',
    name: 'ML / AI / Analytics',
    desc: 'Leverage machine learning, AI, and advanced analytics to unlock insights from your data and build intelligent, self-improving business processes.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="22" r="3" />
        <circle cx="22" cy="10" r="3" />
        <circle cx="34" cy="22" r="3" />
        <circle cx="22" cy="34" r="3" />
        <circle cx="22" cy="22" r="5" />
        <line x1="13" y1="22" x2="17" y2="22" />
        <line x1="22" y1="13" x2="22" y2="17" />
        <line x1="27" y1="22" x2="31" y2="22" />
        <line x1="22" y1="27" x2="22" y2="31" />
        <line x1="14" y1="14" x2="18" y2="18" />
        <line x1="30" y1="14" x2="26" y2="18" />
        <line x1="14" y1="30" x2="18" y2="26" />
        <line x1="30" y1="30" x2="26" y2="26" />
      </svg>
    ),
  },
  {
    num: '06',
    name: 'Consulting Services',
    desc: 'Strategic IT consulting, software development, testing services, and mobile app development tailored to your unique business challenges.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="16" width="32" height="20" rx="2" />
        <path d="M28 16v-4a6 6 0 0 0-12 0v4" />
        <line x1="6" y1="26" x2="38" y2="26" />
        <circle cx="22" cy="33" r="2" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="services-wrap">
      <div className="services-section">
        <div className="services-header reveal">
          <div>
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-title">Our Services</h2>
          </div>
          <Link href="#contact" className="btn-primary">
            Start a Project ↗
          </Link>
        </div>

        <div className="services-grid reveal">
          {services.map((service) => (
            <div key={service.num} className="service-card">
              <div className="service-num">{service.num}</div>
              <div className="service-icon-wrap">{service.icon}</div>
              <div className="service-name">{service.name}</div>
              <div className="service-desc">{service.desc}</div>
              <div className="service-arrow">↗</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
