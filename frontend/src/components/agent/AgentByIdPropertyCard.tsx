import { NavLink } from "react-router-dom";
import type { AgentByIdPropertyCardProps } from "../../type/interface/agent/agent.interface";
import { getWishList, toggleLikeUnlike } from "../../store/slices/user.slice";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { Heart } from "lucide-react";

const AgentByIdPropertyCard: React.FC<AgentByIdPropertyCardProps> = ({
  item,
}) => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSeletor((state) => state.auth);
  const { favouritesPropertyIds } = useAppSeletor((state) => state.users);

  const isLikedByMe = favouritesPropertyIds.includes(String(item.id));

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
    <>
      <div
        key={item.id}
        className="property-card flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
        data-category={item.category}
      >
        <div className="relative h-48 sm:h-56 md:h-64 w-full">
          <img
            src={item.imgSrc}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.badge && (
            <div
              className={`absolute top-4 left-0 text-white text-xs font-bold px-4 py-1.5 ribbon pr-6 ${item.badge.className}`}
            >
              {item.badge.text}
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-1.5">
                <i className="fa-solid fa-location-dot text-gray-800"></i>{" "}
                {item.location}
              </span>
              <button
                className="text-slate-900 hover:text-red-500 transition"
                onClick={() => handleWishList(String(item.id))}
              >
                <Heart
                  className={`text-sm ${isLikedByMe ? "fill-yellow-400 " : ""}`}
                />
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-[12px] sm:text-sm font-medium mb-4 sm:mb-6">
            Size: {item.size}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <p className="text-[13px] sm:text-[15px] font-bold text-gray-800">
              Start From: {item.price}
            </p>
            <NavLink
              to={item.redirectUrl}
              className="bg-[#171e2e] text-white text-center px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#facc15] hover:text-[#171E2E] transform hover:-translate-x-2 shadow hover:shadow-md transition-all duration-200"
            >
              Get Quote
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentByIdPropertyCard;
