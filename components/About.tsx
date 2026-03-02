export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner reveal">
        <div className="about-grid">
          {/* Left: title + stats */}
          <div>
            <div className="section-eyebrow">Who We Are</div>
            <h2 className="about-title">
              Trusted IT Partner<br />Since <em>2010</em>
            </h2>
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-num">13+</div>
                <div className="about-stat-label">Years of Excellence</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">200+</div>
                <div className="about-stat-label">Projects Delivered</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">50+</div>
                <div className="about-stat-label">Enterprise Clients</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">F500</div>
                <div className="about-stat-label">Trusted Partners</div>
              </div>
            </div>
          </div>

          {/* Right: body text + feature list */}
          <div>
            <div className="about-body">
              <p>
                OctaUnitech Solutions Pvt. Ltd. is a Bangalore-based technology company
                specialising in Cloud Computing, DevOps, Digital Transformation, and
                System Integration.
              </p>
              <p>
                We have been a trusted partner to small, medium, and large enterprises —
                including Fortune 500 firms — enabling businesses to overcome critical
                challenges through integrated, reliable, and cost-effective IT solutions.
              </p>
              <p>
                Our mission is simple: to help organisations transform their IT environment
                with best-in-class solutions that provide a lasting competitive edge.
              </p>
            </div>

            <ul className="about-features">
              <li>AWS, Azure &amp; Google Cloud Certified</li>
              <li>ISO 27001 Compliant &amp; CMMI Level 3</li>
              <li>End-to-End Ownership — Strategy to Support</li>
              <li>Serving Fortune 500 &amp; SMEs Globally</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
