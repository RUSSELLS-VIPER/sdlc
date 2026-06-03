import { useNavigate } from "react-router-dom";
import mapPin from '../../../assets/images/userDashboardImages/map-pin.svg'
import type { UserDashboardPropertyCardProps } from "../../../type/interface/userDashboard/userDashboard.interface";


const UserSavedPropertiesCard:React.FC<UserDashboardPropertyCardProps> = ({ item }) => {
  const navigate = useNavigate()
   let processedImgSrc = "https://placehold.co/600x400?text=No+Image";

if (item?.image) {
  if (typeof item.image === "string") {
    // Case 1: Standard string URL path
    processedImgSrc = item.image;
  } else if (typeof item.image === "object") {
    // Case 2: Nested MongoDB Binary Object or Array Buffers
    const contentType = item.image.contentType;
    const imageData = item.image.data;

    // Type Guard Check: Safely see if it matches the MongoDB base64 block
    if (imageData && typeof imageData === "object" && "$binary" in imageData) {
      const embeddedBase64 = imageData.$binary?.base64;
      if (embeddedBase64) {
        processedImgSrc = `data:${contentType};base64,${embeddedBase64}`;
      }
    } else {
      // Case 3 & Fallback: Read raw number arrays safely
      let rawDataArray: number[] | null = null;

      if (Array.isArray(imageData)) {
        rawDataArray = imageData;
      } else if (imageData && typeof imageData === "object" && "data" in imageData) {
        rawDataArray = imageData.data;
      }

      if (rawDataArray && rawDataArray.length > 0) {
        try {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(rawDataArray))
          );
          processedImgSrc = `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing binary image buffer:", error);
        }
      }
    }
  }
}
  return (
    <>
      <div
        className="bg-[#F0F4F9] rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm overflow-hidden group"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden isolate bg-slate-100 rounded-2xl">

          <img
            src={processedImgSrc}
            alt={item.title}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
          />

          <button className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#FCA311] bg-white rounded-full shadow-sm hover:bg-[#FCA311] hover:text-white transition-colors z-10">
            <i className="fa-solid fa-heart text-xs sm:text-sm"></i>
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-base sm:text-lg font-bold text-[#1E1E1E] truncate">
              {item.title}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-500 shrink-0 ml-2">
              {item.bhk}
            </span>
          </div>

          <div className="flex justify-between items-center mb-2 gap-1">
            <p className="text-xs sm:text-sm text-slate-600 flex items-center space-x-1 min-w-0">
              <img
                src={mapPin}
                alt="Pin"
                className="w-4 h-4 shrink-0"
              />
              <span className="truncate">{item.address}</span>
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold shrink-0">
              Starting From
            </p>
          </div>

          <div className="flex justify-between items-center mb-3">
            <p className="text-xs sm:text-sm text-slate-700">
              <span className="font-semibold text-slate-500">Status -</span>{" "}
              {item.status}
            </p>
            <div className="text-right">
              <div className="text-lg sm:text-xl font-black text-[#1E1E1E]">
                {item.price}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-400">Sq.FT -</span>{" "}
              {item.sqft}
            </p>
            <button
               onClick={() => navigate(`/property/${item._id}`)}
              className="bg-[#171e2e] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-yellow-400 hover:text-[#171E2E] transform hover:-translate-x-2 shadow hover:shadow-md transition-all duration-200"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSavedPropertiesCard;