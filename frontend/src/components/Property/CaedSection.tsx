import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { getProperties } from "../../store/slices/property.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getWishList, toggleLikeUnlike } from "../../store/slices/user.slice";
import { Heart } from "lucide-react";

const CaedSection = () => {
  const { items } = useAppSeletor((state) => state.property);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favouritesPropertyIds } = useAppSeletor((state) => state.users);
  const { token, user } = useAppSeletor((state) => state.auth);
  useEffect(() => {
    dispatch(getProperties());
    if (token) {
      dispatch(getWishList());
    }
  }, [dispatch, token]);

  useEffect(() => {}, [dispatch, token]);

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
    <section>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/property")}
          className="border-2 border-gray-300 rounded-lg px-6 py-2 text-sm font-bold text-gray-700 hover:bg-[#1e293b] hover:border-[#1e293b] hover:text-white transition duration-300 shadow-sm"
        >
          View All
        </button>
      </div>

      <div className="bg-[#e5e7eb] p-4 sm:p-6 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {items?.slice(0, 2).map((property) => (
            <div
              key={property._id}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm flex flex-col relative group"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => handleWishList(String(property._id))}
                  className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-orange-400 shadow-md hover:bg-orange-50 transition"
                >
                  <Heart
                    className={`text-sm ${favouritesPropertyIds.includes(String(property._id)) ? "fill-yellow-400 " : ""}`}
                  />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {property.title}
                  </h3>

                  <span className="text-sm font-medium text-gray-500">
                    {property.propertyType}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{property.address}</span>
                  </div>

                  <span className="text-xs font-semibold text-gray-500">
                    Starting From
                  </span>
                </div>

                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Status -
                    <span className="font-normal text-gray-600">
                      {" "}
                      {property.status}
                    </span>
                  </span>

                  <span className="text-2xl font-bold text-gray-900">
                    {property.price}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-sm font-medium text-gray-700">
                    Sq.FT -
                    <span className="font-normal text-gray-600">
                      {" "}
                      {property.sqft}
                    </span>
                  </span>

                  <button
                    onClick={() => {
                      if (!token && !user) {
                        toast.success(
                          "Please Login first to see profile details",
                        );
                        return;
                      }
                      navigate(`/property/${property._id}`);
                    }}
                    className="bg-[#171e2e] text-white text-center px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#facc15] hover:text-[#171E2E] transform hover:-translate-x-2 shadow hover:shadow-md transition-all duration-200"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaedSection;
