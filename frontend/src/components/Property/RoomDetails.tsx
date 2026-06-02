import React from 'react'

const RoomDetails = () => {
  return (
     <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Room Details</h2>
            <div className="space-y-4">
              <div
                className="flex items-center justify-between pt-2 pb-3 border-b border-gray-500"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <i className="fa-solid fa-bed text-gray-400 w-5 text-center"></i>
                  <span className="font-medium text-sm">Bedrooms 1</span>
                </div>
                <span className="text-sm text-gray-600 font-medium"
                  >10 X 12 Ft</span>
                
              </div>
              <div
                className="flex items-center justify-between pt-2 pb-3 border-b border-gray-500"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <i className="fa-solid fa-bed text-gray-400 w-5 text-center"></i>
                  <span className="font-medium text-sm">Bedrooms 2</span>
                </div>
                <span className="text-sm text-gray-600 font-medium"
                  >10 X 10 Ft</span>
                
              </div>
              <div
                className="flex items-center justify-between pt-2 pb-3 border-b border-gray-500"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <i className="fa-solid fa-couch text-gray-400 w-5 text-center"></i>
                  <span className="font-medium text-sm">Living Room</span>
                </div>
                <span className="text-sm text-gray-600 font-medium"
                  >12 X 14 Ft</span>
                
              </div>
              <div
                className="flex items-center justify-between pt-2 pb-3 border-b border-gray-500"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <i
                    className="fa-solid fa-kitchen-set text-gray-400 w-5 text-center"
                  ></i>
                  <span className="font-medium text-sm">Kitchen</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">8 X 10 Ft</span>
              </div>
              <div
                className="flex items-center justify-between pt-2 pb-3 border-b border-gray-500"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <i className="fa-solid fa-bath text-gray-400 w-5 text-center"></i>
                  <span className="font-medium text-sm">Bathroom 1</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">5 X 7 Ft</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <i className="fa-solid fa-bath text-gray-400 w-5 text-center"></i>
                  <span className="font-medium text-sm">Bathroom 2</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">5 X 7 Ft</span>
              </div>
            </div>
          </div>
  )
}

export default RoomDetails