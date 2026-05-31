
import { NavLink } from "react-router-dom";
import heroimg from "../../assets/images/Properties/prpperty-bg.png";

type HeroProps = {
  title?: string;
  breadcrumbLabel?: string;
  backgroundImage?: string;
};

const Hero = ({
  title = "Property Listing",
  breadcrumbLabel = "Properties",
  backgroundImage = heroimg,
}: HeroProps) => {
  return (
    <div className="text-white antialiased">
      
      <div
        className="relative w-full h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/30"></div> */}

        {/* Content */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {title}
          </h1>

           <div
          className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base font-medium mt-2"
          >
          <NavLink to="/" className="hover:text-yellow-400 transition">Home</NavLink>
          <span className="text-[10px] sm:text-xs"
            ><i className="fa-solid fa-angle-right"></i>
          </span>
          <span className="text-white">{breadcrumbLabel}</span>
        </div>
        </div>

      </div>

    </div>
  );
};
export default Hero;
