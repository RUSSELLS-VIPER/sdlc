import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSeletor } from "../../services/helper/reduxstore"
import { useEffect } from "react"
import { getPropertyById } from "../../store/slices/property.slice"


const LocationMap = () => {
  const {id} = useParams()
  // console.log("id", id)
  const {itemById} = useAppSeletor((state)=> state.property)
  const dispatch = useAppDispatch()
  console.log("itemById", itemById)

    useEffect(()=> {
      dispatch(getPropertyById({id: id}))
    }, [id, dispatch])
  return (
     <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Location</h2>

            <div
              className="w-full rounded-xl overflow-hidden mb-4 border border-gray-100 relative h-[300px] sm:h-[400px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117826.96989445173!2d88.40698183182878!3d22.723049182377317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8a379120610f7%3A0x6bcfd36a9b4009bb!2sBarasat%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1716301234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              >
              </iframe>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-2 mt-4">
              <i className="fa-solid fa-location-dot text-gray-400"></i>
              <span className="text-sm font-medium">{itemById?.address}</span>
            </div>
            <p className="text-sm text-gray-800 font-semibold mt-1">
              Well connected to market,school,hospital,and transport.
            </p>
          </section>
  )
}

export default LocationMap