import React from 'react'

const Amenities = () => {
  return (
   <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                >
                  <i className="fa-solid fa-droplet"></i>
                </div>
                <span className="text-sm font-medium text-gray-700"
                  >Water Supply</span
                >
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                >
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <span className="text-sm font-medium text-gray-700"
                  >Electricity</span
                >
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                >
                  <i className="fa-solid fa-car-side"></i>
                </div>
                <span className="text-sm font-medium text-gray-700"
                  >Parking Space</span
                >
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                >
                  <i className="fa-solid fa-store"></i>
                </div>
                <span className="text-sm font-medium text-gray-700"
                  >Nearby Market</span
                >
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                >
                  <i className="fa-solid fa-school"></i>
                </div>
                <span className="text-sm font-medium text-gray-700"
                  >School Nearby</span
                >
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                >
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <span className="text-sm font-medium text-gray-700"
                  >Hospital Nearby</span
                >
              </div>
            </div>
          </div>
  )
}

export default Amenities