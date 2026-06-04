import Chatwithus from "../../components/contact/Chatwithus"
import ContactInfo from "../../components/contact/ContactInfo"
import FaqSection from "../../components/contact/FaqSection"
import HeroContact from "../../components/contact/HeroSection"
import MapSection from "../../components/contact/MapSection"
import Newslettersection from "../../components/contact/Newslettersection"
import Videoshow from "../../components/contact/Videoshow"
import { Helmet } from "react-helmet-async";



const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Infinity Horizon | Contact Our Property Consultants</title>
        <meta name="description" content="Contact Infinity Horizon for expert real estate guidance. Get assistance with buying, selling, investing, and property consultations." />
        <link rel="canonical" href="https://sdlc-6d9t.vercel.app/contact-us/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "When is the right time to sell my house?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The right time to sell your house is when market conditions favor sellers-typically when demand is high and inventory is low. It also depends on your personal readiness, such as financial goals and relocation plans."
              }
            },{
              "@type": "Question",
              "name": "What is the process of buying a home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The process usually starts with determining your budget and getting pre-approved for a mortgage. After that, you search for homes, make an offer, complete an inspection, and finally close the deal."
              }
            },{
              "@type": "Question",
              "name": "How much do I need for a down payment?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Down payments usually range from 3% to 20% based on your loan type and eligibility."
              }
            },{
              "@type": "Question",
              "name": "How do I know how much house I can afford?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use your monthly income, liabilities, and lender pre-approval to set a safe budget range."
              }
            },{
              "@type": "Question",
              "name": "What is a pre-approval, and why is it important?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pre-approval confirms your loan eligibility and strengthens your offer while buying."
              }
            },{
              "@type": "Question",
              "name": "Should I buy or rent a home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Buying helps build long-term equity; renting offers flexibility depending on your goals."
              }
            }]
          }
        `}</script>
      </Helmet>
      <HeroContact/>
      <ContactInfo/>
      <Chatwithus/>
      <Videoshow/>
      <FaqSection/>
      <MapSection/>
      <Newslettersection/>
    </div>
  )
}

export default Contact