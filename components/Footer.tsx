import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        {/* Brand column */}
        <div>
          <Link href="/" className="footer-logo-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.png`} alt="OctaUnitech" />
          </Link>
          <p className="footer-desc">
            Cloud, Technology, and Consulting Services since 2010. Bangalore, India.
          </p>
        </div>

        {/* Services */}
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            <li><Link href="#">Cloud Services</Link></li>
            <li><Link href="#">DevOps Consulting</Link></li>
            <li><Link href="#">Digital Transformation</Link></li>
            <li><Link href="#">System Integration</Link></li>
            <li><Link href="#">ML / AI / Analytics</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Case Studies</Link></li>
            <li><Link href="#">Partners</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><a href="mailto:sales@octaunitech.com">sales@octaunitech.com</a></li>
            <li><a href="https://octaunitech.com">www.octaunitech.com</a></li>
          </ul>
          <p className="footer-address">
            Kodihalli, Bangalore<br />560008, India
          </p>
        </div>
      </footer>

      <div className="footer-bottom">
        <span>© 2026 OctaUnitech Solutions Pvt. Ltd. All rights reserved.</span>
        <span>Designed with <a href="https://claude.ai">Claude.ai</a></span>
      </div>
    </>
  )
}
