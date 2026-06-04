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