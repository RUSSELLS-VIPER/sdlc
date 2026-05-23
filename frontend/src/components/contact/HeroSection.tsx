import { NavLink } from "react-router-dom"
import banner from "../../assets/images/contacts-images/banner.png"
const HeroContact = () => {
  return (
     <div className="text-white antialiased">

    <div
      className="relative w-full h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat flex flex-col"
      style={{backgroundImage:` url(${banner})`}}
    >
   <div
        className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4"
      >
        <h1
          className="text-white text-4xl sm:text-5xl md:text-7xl font-semibold mb-4 leading-tight"
        >
          Contacts Us
        </h1>
        <div
          className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base font-medium mt-2"
        >
          <NavLink to="/" className="hover:text-yellow-400 transition">Home</NavLink>
          <span className="text-[10px] sm:text-xs"
            ><i className="fa-solid fa-angle-right"></i></span>
          <span className="text-white">Contacts Us</span>
        </div>
      </div>
      </div>
      </div>
  )
}

export default HeroContact