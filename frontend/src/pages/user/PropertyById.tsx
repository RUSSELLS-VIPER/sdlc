
import Breadcrumb from '../../components/Property/BreadCrumb';
import LeftContent from '../../components/Property/LeftContent';
import HeroGalary from '../../components/Property/HeroGalary';
import PropertyInfo from '../../components/Property/PropertyInfo';
import RoomDetails from '../../components/Property/RoomDetails';
import Amenities from '../../components/Property/Amenities';
import ImageGallery from '../../components/Property/ImageGallery';
import LocationMap from '../../components/Property/LocationMap';
import CaedSection from '../../components/Property/CaedSection';

const PropertyById = () => {
  return (
  
<main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

     <section className="text-sm font-semibold text-gray-700 mb-8">
      <Breadcrumb />
    </section>

    <HeroGalary />

   <section
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >

      <div className="lg:col-span-4 order-2 lg:order-1">
    
    <div className="sticky top-24 space-y-6">
      <LeftContent />
    </div>
    </div>

      <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
        <PropertyInfo />
        <RoomDetails />
        <Amenities />
        <ImageGallery />
        <LocationMap />
        <CaedSection />
      </div>

    </section>

  </main>
);
  
}

export default PropertyById