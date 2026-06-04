import Hero from "../../components/Property/Hero";
import PropertySection from "../../components/Property/properties/PropertySection";
import { Helmet } from "react-helmet-async";




const PropertiesPage = () => {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://sdlc-6d9t.vercel.app/properties/" />
      </Helmet>
      <Hero />
     <PropertySection/>
     
    </>
  );
};

export default PropertiesPage;