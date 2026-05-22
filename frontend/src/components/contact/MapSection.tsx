import React from 'react'

const MapSection = () => {
  return (
     <section id="map" className="bg-[#edf1f7] w-full">
      <div
        className="relative w-full overflow-hidden h-[30vh] sm:h-[50vh] lg:h-[70vh]"
      >
        {/* Embedded Google Map  */}
        <iframe
          src="https://maps.google.com/maps?q=Kolkata,+West+Bengal&t=&z=12&ie=UTF8&iwloc=&output=embed"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Interactive map of Kolkata, West Bengal"
        ></iframe>
      </div>
    </section>
  )
}

export default MapSection