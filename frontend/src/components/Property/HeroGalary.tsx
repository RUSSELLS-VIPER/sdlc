import React, { useState } from 'react'

import  exterior from "../../assets/images/property_details/modal-img-1.png"
import interior from "../../assets/images/property_details/modal-img-2.png"
import kitchen from "../../assets/images/property_details/modal-img-3.png"
import livingroom from "../../assets/images/property_details/modal-img-4.png"
import  extrabedroom from "../../assets/images/property_details/modal-img-5.png"
import ModalPopup from './ModalPopup'
const HeroGalary = () => {
    const [mainImage, setMainImage] = useState(exterior);
    const [openModal, setOpenModal] = useState(false);
    const swapImage = (image: string) => {
    setMainImage(image);
  };
  return (
    <>
     <section
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[550px] xl:h-[600px] mb-12"
      >
       
        <div
          className="lg:col-span-7 relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-full group shadow-sm bg-gray-200"
        >
          <img
            id="mainImage"
            src={mainImage}
            alt="Main Property Exterior"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
          />

          <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
            <button
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-orange-400 hover:text-white hover:bg-orange-400 transition duration-300"
            >
              <i className="fa-regular fa-heart text-lg"></i>
            </button>
            <button
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-orange-400 hover:text-white hover:bg-orange-400 transition duration-300"
            >
              <i className="fa-solid fa-share-nodes text-lg"></i>
            </button>
          </div>
        </div>

        
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full group cursor-pointer bg-gray-200"
            onClick={()=>swapImage(interior)}
          >
            <img
              src={interior}
              alt="Interior Bedroom"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full group cursor-pointer bg-gray-200"
            onClick={()=>swapImage(kitchen)}
          >
            <img
              src={kitchen}
              alt="Kitchen Area"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>
       
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full group cursor-pointer bg-gray-200"
            onClick={()=>swapImage(livingroom)}
          >
            <img
              src={livingroom}
              alt="Living Room"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full cursor-pointer group bg-gray-200"
            onClick={()=>setOpenModal(true)}
          >
            <img
              src={extrabedroom}
              alt="Extra Bedroom"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center group-hover:bg-white/40 transition duration-300 z-10"
            >
              <span
                className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm"
                >70+</span>
              
            </div>
          </div>
        </div>
      </section>
      <ModalPopup
      openModal={openModal}
      setOpenModal={setOpenModal}
    />
    </>
  )
}

export default HeroGalary