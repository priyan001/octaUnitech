import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import VisionMission from '@/components/VisionMission'
import About from '@/components/About'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Testimonial from '@/components/Testimonial'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import ChatPanel from '@/components/ChatPanel'

const certs = [
  'AWS Certified Partner',
  'Microsoft Azure Partner',
  'Google Cloud Partner',
  'ISO 27001 Compliant',
  'CMMI Level 3',
]

const clients = [
  'Fortune 500',
  'Enterprise A',
  'Enterprise B',
  'Enterprise C',
  'Enterprise D',
]

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />

      <main>
        <Hero />
        <VisionMission />

        {/* Certifications Band */}
        <div className="cert-band reveal">
          {certs.map((cert) => (
            <div key={cert} className="cert-item">{cert}</div>
          ))}
        </div>

        <About />
        <Services />
        <WhyUs />

        {/* Client Logos */}
        <div className="clients-wrap">
          <div className="clients-section reveal">
            <div className="clients-label">Trusted by Leading Organisations</div>
            <div className="clients-logos">
              {clients.map((client) => (
                <div key={client} className="client-logo">{client}</div>
              ))}
            </div>
          </div>
        </div>

        <Testimonial />
        <CTA />
      </main>

      <Footer />
      <ChatPanel />
    </>
  )
}
