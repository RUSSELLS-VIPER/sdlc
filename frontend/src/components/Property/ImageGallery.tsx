import livingroom  from "../../assets/images/property_details/galary-img-1.png"
 import bedroom from "../../assets/images/property_details/galary-img-2.png"
 import bedroom2 from "../../assets/images/property_details/galary-img-3.png"
 import kitchen from "../../assets/images/property_details/galary-img-4.png"
 import bathroom from "../../assets/images/property_details/galary-img-5.png"
 import exterior from "../../assets/images/property_details/galary-img-6.png"

const ImageGallery = () => {
  return (
     <div className="py-2 sm:py-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Image Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 bg-gray-200 h-24 sm:h-32"
              >
                <img
                  src={livingroom}
                  alt="Living Room"
                  className="w-full h-full object-cover hover:opacity-80 hover:scale-[1.03] transition-all duration-300 transform"
                />
              </div>
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 bg-gray-200 h-24 sm:h-32"
              >
                <img
                  src={bedroom}
                  alt="Bedroom"
                  className="w-full h-full object-cover hover:opacity-80 hover:scale-[1.03] transition-all duration-300 transform"
                />
              </div>
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 bg-gray-200 h-24 sm:h-32"
              >
                <img
                  src={bedroom2}
                  alt="Bedroom 2"
                  className="w-full h-full object-cover hover:opacity-80 hover:scale-[1.03] transition-all duration-300 transform"
                />
              </div>
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 bg-gray-200 h-24 sm:h-32"
              >
                <img
                  src={kitchen}
                  alt="Kitchen"
                  className="w-full h-full object-cover hover:opacity-80 hover:scale-[1.03] transition-all duration-300 transform"
                />
              </div>
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 bg-gray-200 h-24 sm:h-32"
              >
                <img
                  src={bathroom}
                  alt="Bathroom"
                  className="w-full h-full object-cover hover:opacity-80 hover:scale-[1.03] transition-all duration-300 transform"
                />
              </div>
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 bg-gray-200 h-24 sm:h-32"
              >
                <img
                  src={exterior}
                  alt="Exterior"
                  className="w-full h-full object-cover hover:opacity-80 hover:scale-[1.03] transition-all duration-300 transform"
                />
              </div>
            </div>
          </div>
  )
}

export default ImageGallery