import { useNavigate } from "react-router-dom";
import mapPin from "../../../assets/images/userDashboardImages/map-pin.svg";
import type { UserDashboardPropertyCardProps } from "../../../type/interface/userDashboard/userDashboard.interface";


const UserDashboardPropertyCrad: React.FC<UserDashboardPropertyCardProps> = ({
  item,
}) => {
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
      <div className="w-[calc(100%-4px)] sm:w-[calc(50%-12px)] shrink-0 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
        <div className="relative w-full h-44 sm:h-52 md:h-56 rounded-xl overflow-hidden mb-2">
          <img
            src={processedImgSrc}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#FCA311] bg-white rounded-full shadow-sm hover:bg-[#FCA311] hover:text-white transition-colors z-10">
            <i className="fa-solid fa-heart text-xs sm:text-sm"></i>
          </button>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-start mb-1.5 sm:mb-2">
            <span className="text-base sm:text-xl font-bold text-[#1E1E1E] leading-tight">
              {item.title}
            </span>
            <span className="text-xs sm:text-base font-semibold text-[#1E1E1E]/80 tracking-wide">
              {item.propertyType}
            </span>
          </div>

          <div className="flex justify-between items-center mb-1.5 sm:mb-2 gap-1">
            <p className="text-xs sm:text-base text-[#1E1E1E] flex items-center space-x-1 min-w-0 truncate">
              <img
                src={mapPin}
                alt="map-pin"
                className="w-4 h-4 sm:w-6 sm:h-6 shrink-0"
              />
              <span className="truncate">{item.address}</span>
            </p>
            <p className="flex items-center text-[10px] sm:text-base text-[#1E1E1E]/80 uppercase font-semibold whitespace-nowrap tracking-tighter sm:tracking-normal">
              Starting From
            </p>
          </div>

          <div className="flex justify-between items-center mb-1">
            <p className="text-xs sm:text-base text-[#1E1E1E]">
              <span className="font-semibold">Status -</span>{" "}
              <span className="font-normal text-[#1E1E1E]/90">
                {item.status}
              </span>
            </p>
            <div className="text-right">
              <div className="text-lg sm:text-[24px] font-bold sm:font-medium text-[#1E1E1E]/80 leading-none">
                {item.price}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-base text-[#1E1E1E]">
              <span className="font-semibold">Sq.FT -</span>{" "}
              <span className="font-normal text-[#1E1E1E]/90">{item.sqft}</span>
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

export default UserDashboardPropertyCrad;
