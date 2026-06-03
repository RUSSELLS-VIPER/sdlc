import { useEffect, useState } from "react";
import interior from "../../assets/images/property_details/modal-img-2.png";
import kitchen from "../../assets/images/property_details/modal-img-3.png";
import livingroom from "../../assets/images/property_details/modal-img-4.png";
import extrabedroom from "../../assets/images/property_details/modal-img-5.png";
import ModalPopup from "./ModalPopup";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { getPropertyById } from "../../store/slices/property.slice";
import { getWishList, toggleLikeUnlike } from "../../store/slices/user.slice";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const HeroGalary = () => {
  const { id } = useParams<{ id: string }>(); 
  const dispatch = useAppDispatch();
  
  const { itemById } = useAppSeletor((state) => state.property); 
  const { token, user } = useAppSeletor((state) => state.auth);
  const { favouritesPropertyIds } = useAppSeletor((state) => state.users);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Derive the main image dynamically during render.
  const displayImage = selectedImage || itemById?.image || "";

  const swapImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleWishList = async (propertyId: string) => {
    if (!user && !token) {
      toast.success("Please Login First to like a property");
      return;
    }
    try {
      const response = await dispatch(toggleLikeUnlike(propertyId)).unwrap();
      if (response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById({ id }));
    }
    if (token) {
      dispatch(getWishList());
    }

  
    return () => {
      setSelectedImage(null);
    };
  }, [id, dispatch, token]);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[550px] xl:h-[600px] mb-12">
        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-full group shadow-sm bg-gray-200">
          <img
            id="mainImage"
            src={displayImage} 
            alt="Main Property Exterior"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
          />

          <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
            <button  
              onClick={() => handleWishList(String(itemById?._id))} 
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-orange-400 hover:text-white hover:bg-orange-400 transition duration-300"
            >
              <Heart
                className={`text-sm ${favouritesPropertyIds.includes(String(itemById?._id)) ? "fill-yellow-400 " : ""}`}
              />
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-orange-400 hover:text-white hover:bg-orange-400 transition duration-300">
              <i className="fa-solid fa-share-nodes text-lg"></i>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full group cursor-pointer bg-gray-200"
            onClick={() => swapImage(interior)}
          >
            <img
              src={interior}
              alt="Interior Bedroom"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full group cursor-pointer bg-gray-200"
            onClick={() => swapImage(kitchen)}
          >
            <img
              src={kitchen}
              alt="Kitchen Area"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full group cursor-pointer bg-gray-200"
            onClick={() => swapImage(livingroom)}
          >
            <img
              src={livingroom}
              alt="Living Room"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-sm h-[150px] sm:h-[200px] lg:h-full cursor-pointer group bg-gray-200"
            onClick={() => setOpenModal(true)}
          >
            <img
              src={extrabedroom}
              alt="Extra Bedroom"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center group-hover:bg-white/40 transition duration-300 z-10">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm">
                70+
              </span>
            </div>
          </div>
        </div>
      </section>
      <ModalPopup openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default HeroGalary;