import React from 'react'

const PropertyInfo = () => {
  return (
    <>
    <div
            className="flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Barasat Duplex Luxury Villa
              </h1>
              <p className="text-gray-500 text-sm flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-gray-400"></i>
                Barasat, Chapadali More
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-2xl font-bold text-gray-900 whitespace-nowrap"
                >Price ₹ 38 L</span>
              
            </div>
          </div>

           <div
            className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <i className="fa-solid fa-bed text-gray-400 text-xl mb-2"></i
              ><span className="font-bold text-gray-900 text-sm">2</span
              ><span className="text-xs text-gray-500">Bedrooms</span>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center border-l border-gray-100"
            >
              <i className="fa-solid fa-kitchen-set text-gray-400 text-xl mb-2"></i
              ><span className="font-bold text-gray-900 text-sm">1</span
              ><span className="text-xs text-gray-500">Kitchen</span>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center border-l border-gray-100"
            >
              <i className="fa-solid fa-couch text-gray-400 text-xl mb-2"></i
              ><span className="font-bold text-gray-900 text-sm">1</span
              ><span className="text-xs text-gray-500">Living Room</span>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center sm:border-l border-gray-100"
            >
              <i className="fa-solid fa-bath text-gray-400 text-xl mb-2"></i
              ><span className="font-bold text-gray-900 text-sm">2</span
              ><span className="text-xs text-gray-500">Bathrooms</span>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center border-l border-gray-100"
            >
              <i
                className="fa-solid fa-ruler-combined text-gray-400 text-xl mb-2"
              ></i
              ><span className="font-bold text-gray-900 text-sm">800</span
              ><span className="text-xs text-gray-500">Sq Ft Area</span>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center border-l border-gray-100"
            >
              <i className="fa-solid fa-car text-gray-400 text-xl mb-2"></i
              ><span className="font-bold text-gray-900 text-sm">Car</span
              ><span className="text-xs text-gray-500">Parking</span>
            </div>
          </div>
           <p className="text-gray-600 text-sm leading-relaxed">
            "This stunning modern home offers a perfect blend of luxury and
            comfort. Featuring spacious rooms, large windows for natural light,
            and a beautifully designed interior, this property is ideal for
            families looking for a peaceful yet stylish living experience. A
            well-designed property located in a prime area, offering comfortable
            living spaces, modern amenities, and easy access to nearby schools,
            markets, and transportation."
          </p>
          </>
  )
}

export default PropertyInfo