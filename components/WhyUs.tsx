const reasons = [
  {
    num: '01',
    title: 'Decade of Expertise',
    desc: 'Over 13 years of experience delivering complex IT projects across industries, from startups to Fortune 500 enterprises.',
  },
  {
    num: '02',
    title: 'Certified Cloud Experts',
    desc: 'Our team holds certifications across AWS, Microsoft Azure, and Google Cloud — ensuring you get the best solution for your environment.',
  },
  {
    num: '03',
    title: 'End-to-End Ownership',
    desc: "We don't just consult — we implement, integrate, support, and optimise. One trusted partner for your entire technology journey.",
  },
  {
    num: '04',
    title: 'Cost-Effective Delivery',
    desc: 'Competitive pricing without compromising quality. Our lean, experienced teams deliver more value per rupee than larger system integrators.',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="why-section-wrap">
      <div className="why-section">
        <div className="why-header reveal">
          <div className="section-eyebrow">Why OctaUnitech</div>
          <h2 className="section-title">
            What Makes Us<br />Different
          </h2>
        </div>

        <div className="why-grid">
          {reasons.map((item) => (
            <div key={item.num} className="why-item reveal">
              <div className="why-item-num">{item.num}</div>
              <div className="why-title">{item.title}</div>
              <div className="why-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
