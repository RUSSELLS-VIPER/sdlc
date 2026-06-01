import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProperties } from "../../store/slices/property.slice";
import { useAppDispatch, useAppSeletor } from "../../services/helper/reduxstore";

const HomeOnGoingProjectCard = () => {
    const dispatch = useAppDispatch()
    const {items} = useAppSeletor((state)=> state.property)


    useEffect(() => {
        dispatch(getProperties({ projectStatus: "Ongoing" }));
      }, [dispatch]);
  return (
    <>
      <div className="w-full lg:w-2/3 relative overflow-hidden rounded-2xl">
      <div
        id="projects-slider"
        className="drag-slider flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none pb-4"
      >
        {items?.map((project) => (
          <div
            key={project._id}
            className="relative w-[85vw] sm:w-[350px] md:w-[400px] h-[450px] sm:h-[550px] flex-shrink-0 rounded-2xl overflow-hidden group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-transparent to-[#0f172a]/90 pointer-events-none"></div>

            <div className="relative h-full p-8 flex flex-col justify-between pointer-events-none">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {project.propertyType}
                </h3>
                {/* <p className="text-slate-200 text-sm font-medium tracking-wide">
                  {project.properties}
                </p> */}
              </div>
                <NavLink
                  to={"/ongoingProject"}
                  className="group/btn flex items-center gap-2 text-lg text-white font-medium hover:text-[#f59e0b] transition-colors duration-300 pointer-events-auto cursor-pointer self-start focus:outline-none"
                >
                  More Details
                  <span className="flex justify-center w-5 h-5 transition-transform duration-300 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                    <i className="fa-solid fa-arrow-right fa-rotate-by"></i>
                  </span>
                </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HomeOnGoingProjectCard;
