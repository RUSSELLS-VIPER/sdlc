import Chatwithus from "../../components/contact/Chatwithus"
import ContactInfo from "../../components/contact/ContactInfo"
import FaqSection from "../../components/contact/FaqSection"
import HeroContact from "../../components/contact/HeroSection"
import MapSection from "../../components/contact/MapSection"
import Newslettersection from "../../components/contact/Newslettersection"
import Videoshow from "../../components/contact/Videoshow"



const Contact = () => {
  return (
    <div>
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