import { useNavigate } from "react-router-dom";
import industrialUnits from "../../assets/images/ongoing-projects/industrial-units.png";
import sqft from "../../assets/images/ongoing-projects/sqft.png";
import type { OnGoingProjectCardType } from "../../type/interface/onGoingProject/onGoingProject.interface";
import { useState } from "react";




const OnGoingProjectCard: React.FC<OnGoingProjectCardType> = ({ project }) => {
    const [wishList, setWishList] = useState(false)
    const navigate = useNavigate()
  return (
    <>
      <div
        key={project.id}
        className="bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full shadow-xl"
      >
        <div className="relative h-56 overflow-hidden group cursor-pointer">
          <img
            src={project.image}
            alt={project.altText}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          <button onClick={()=> setWishList(!wishList)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-[#FCAA31] hover:bg-black/50 transition z-10">
            <i className={`${wishList ? "fa-solid" : "far"} fa-heart`}></i>
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10 pointer-events-none">
            <i className="fas fa-eye text-sm"></i>
            <p className="text-sm font-medium">{project.views}</p>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs mb-5">
            <i className="fa-solid fa-location-dot text-[#FCAA31] mr-1"></i>
            {project.location}
          </p>

          <div className="flex gap-8 sm:gap-12 mb-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Units Available
              </p>
              <p className="font-bold text-gray-800 text-sm mt-0.5">
                {project.unitsAvailable}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Possession
              </p>
              <p className="font-bold text-gray-800 text-sm mt-0.5">
                {project.possession}
              </p>
            </div>
          </div>

          <h4 className="text-[#FCAA31] font-bold text-xl mb-2">
            {project.price}
          </h4>

          <div className="flex justify-between items-end mt-auto pt-2">
            <div className="space-y-1.5">
              <p className="text-xs text-gray-600 flex items-center">
                <img
                  src={industrialUnits}
                  alt="bed"
                  loading="lazy"
                  className="mr-2"
                />
                {project.unitType}
              </p>
              <p className="text-xs text-gray-600 flex items-center">
                <img src={sqft} alt="sqft" loading="lazy" className="mr-2" />
                {project.sizeRange}
              </p>
            </div>
            <button
            onClick={()=> navigate(`/property/:${project.id}`)}
              className="bg-[#171e2e] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-yellow-400 hover:text-[#171E2E] transform hover:-translate-x-2 shadow hover:shadow-md transition-all duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnGoingProjectCard;
