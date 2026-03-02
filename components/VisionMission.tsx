export default function VisionMission() {
  return (
    <section className="vm-section">
      <div className="vm-inner reveal">

        {/* Mission */}
        <div className="vm-card">
          <div className="vm-icon-ring">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Outer ring */}
              <circle cx="50" cy="50" r="46" stroke="var(--text)" strokeWidth="2.5" />
              {/* Back mountain */}
              <polygon points="48,72 68,40 88,72" fill="var(--text)" opacity="0.25" />
              {/* Main mountain */}
              <polygon points="12,72 42,28 72,72" fill="var(--text)" />
              {/* Snow cap highlight */}
              <polygon points="42,28 34,46 50,46" fill="white" opacity="0.15" />
              {/* Ground line */}
              <rect x="10" y="72" width="80" height="3" rx="1.5" fill="var(--text)" opacity="0.4" />
              {/* Flag pole */}
              <line x1="42" y1="28" x2="42" y2="14" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Flag */}
              <polygon points="42,14 57,18.5 42,23" fill="var(--accent)" />
            </svg>
          </div>
          <h3 className="vm-title">
            <span className="vm-our">Our </span>
            <span className="vm-word">Mission</span>
          </h3>
          <p className="vm-body">
            OctaUnitech helps organizations to transform their IT environment with best-in-class
            Cloud Computing Services. Our team of experts delivers highly-effective and reliable
            cloud computing solutions that provide organizations with a competitive edge.
          </p>
        </div>

        {/* Vision */}
        <div className="vm-card">
          <div className="vm-icon-ring">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Outer ring */}
              <circle cx="50" cy="50" r="46" stroke="var(--text)" strokeWidth="2.5" />
              {/* Top bar / handle */}
              <rect x="26" y="34" width="48" height="10" rx="5" fill="var(--text)" />
              {/* Bridge center */}
              <rect x="43" y="52" width="14" height="9" rx="3" fill="var(--text)" />
              {/* Left lens body */}
              <circle cx="33" cy="60" r="17" fill="var(--text)" />
              {/* Left lens inner */}
              <circle cx="33" cy="60" r="10" fill="var(--accent)" />
              {/* Left lens glint */}
              <circle cx="28" cy="55" r="3" fill="white" opacity="0.35" />
              {/* Right lens body */}
              <circle cx="67" cy="60" r="17" fill="var(--text)" />
              {/* Right lens inner */}
              <circle cx="67" cy="60" r="10" fill="var(--accent)" />
              {/* Right lens glint */}
              <circle cx="62" cy="55" r="3" fill="white" opacity="0.35" />
            </svg>
          </div>
          <h3 className="vm-title">
            <span className="vm-our">Our </span>
            <span className="vm-word">Vision</span>
          </h3>
          <p className="vm-body">
            Our vision is to become the most customer centric company; listen to our customers
            and deliver technology and services they trust and value.
          </p>
        </div>

      </div>
    </section>
  )
}
