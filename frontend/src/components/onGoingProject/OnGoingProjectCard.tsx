import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import industrialUnits from "../../assets/images/ongoing-projects/industrial-units.png";
import sqftIcon from "../../assets/images/ongoing-projects/sqft.png";
import type { OnGoingProjectCardType } from "../../type/interface/onGoingProject/onGoingProject.interface";
import { getWishList, toggleLikeUnlike } from "../../store/slices/user.slice";
import { toast } from "sonner";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";

const formatPrice = (price: number) =>
  `₹${Number(price ?? 0).toLocaleString("en-IN")}`;

const OnGoingProjectCard = ({ project }: OnGoingProjectCardType) => {
  // const [wishList, setWishList] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSeletor((state) => state.auth);
  const { favouritesPropertyIds } = useAppSeletor((state) => state.users);

  const projectType = useMemo(
    () => project.propertyType || project.apartmentType || "--",
    [project.apartmentType, project.propertyType],
  );

  const isLikedByMe = favouritesPropertyIds.includes(String(project._id));

  useEffect(() => {
    if (token) {
      dispatch(getWishList());
    }
  }, [token, dispatch]);

  const handleWishList = async (id: string) => {
    if (!user && !token) {
      toast.success("Please Login First to like a property");
      return;
    }
    try {
      const resonse = await dispatch(toggleLikeUnlike(id)).unwrap();
      if (resonse.data.message) {
        toast.success(resonse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full shadow-xl">
      <div className="relative h-56 overflow-hidden group cursor-pointer">
        <img
          src={
            project.image || "/assets/infinity-home/images/index/house-img.png"
          }
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <button
          onClick={() => handleWishList(project._id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-[#FCAA31] hover:bg-black/50 transition z-10"
          aria-label="Wishlist"
        >
          <Heart className={`${isLikedByMe ? "fill-current" : ""}`} size={16} />
        </button>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white z-10">
          <span className="inline-flex items-center rounded-full bg-black/40 px-3 py-1 text-xs font-semibold">
            {project.projectStatus || "Ongoing"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white">
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {project.title}
        </h3>
        <p className="text-gray-500 text-xs mb-5 flex items-center gap-1.5">
          <MapPin size={14} className="text-[#FCAA31]" />
          {project.address}
        </p>

        <div className="flex gap-8 sm:gap-12 mb-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Project Type
            </p>
            <p className="font-bold text-gray-800 text-sm mt-0.5">
              {projectType}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Property Status
            </p>
            <p className="font-bold text-gray-800 text-sm mt-0.5">
              {project.projectStatus || "Ongoing"}
            </p>
          </div>
        </div>

        <h4 className="text-[#FCAA31] font-bold text-xl mb-2">
          {formatPrice(project.price)}
        </h4>

        <div className="flex justify-between items-end mt-auto pt-2">
          <div className="space-y-1.5">
            <p className="text-xs text-gray-600 flex items-center">
              <img
                src={industrialUnits}
                alt="property type"
                loading="lazy"
                className="mr-2"
              />
              {project.propertyType || "--"}
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              <img src={sqftIcon} alt="sqft" loading="lazy" className="mr-2" />
              {project.sqft || "--"}
            </p>
          </div>

          <button
            onClick={() => navigate(`/property/${project._id}`)}
            className="bg-[#171e2e] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-yellow-400 hover:text-[#171E2E] transform hover:-translate-x-2 shadow hover:shadow-md transition-all duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnGoingProjectCard;
