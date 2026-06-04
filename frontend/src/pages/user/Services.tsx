import AboutSection from "../../components/Service/AboutSection"
import ConstructionSection from "../../components/Service/ConstructionSection"
import HeroSection from "../../components/Service/HeroSection"
import ServicesCrds from "../../components/Service/ServicesCrds"
import TeamSection from "../../components/Service/TeamSection"
import { Helmet } from "react-helmet-async";


const Services = () => {
  return (
    <div>
      <Helmet>
        <title>Infinity Horizon | Property Management Services</title>
        <meta name="description" content="Explore expert real estate services, including property buying, selling, investment consulting, and project assistance with Infinity Horizon. Looking for trusted real estate services? Infinity Horizon helps clients buy, sell, invest, and manage residential and commercial properties." />
      </Helmet>
      <HeroSection/>
      <AboutSection/>
      <ConstructionSection/>
      <ServicesCrds/>
      <TeamSection/>
    </div>
  )
}

export default Services