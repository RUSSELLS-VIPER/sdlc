import { useEffect } from "react";
import UserSavedPropertiesCard from "../../components/Dashboard/userDashboard/UserSavedPropertiesCard";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { getWishList } from "../../store/slices/user.slice";
import pv1i1 from "../../assets/images/userDashboardImages/pvi1.png"
import pv1i2 from "../../assets/images/userDashboardImages/pvi2.png"
import pv1i3 from "../../assets/images/userDashboardImages/pvi3.png"
import pv1i4 from "../../assets/images/userDashboardImages/pvi4.png"
import pv1i5 from "../../assets/images/userDashboardImages/pvi5.png"
import mapPin from '../../assets/images/userDashboardImages/map-pin.svg'

const SavedProperties = () => {
  const { wishList } = useAppSeletor((state) => state.users);
  const { token, role } = useAppSeletor((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && role === "user") {
      dispatch(getWishList());
    }
  }, [dispatch, token, role]);

  const visitIndicatorData = [
    {
      id: 1,
      title: "Apartment",
      bhk: "2BHK",
      address: "Sodepur, H.B Town",
      imageSrc: pv1i1,
      status: "done", 
    },
    {
      id: 2,
      title: "Duplex House",
      bhk: "3BHK",
      address: "Tamluk, GT Road",
      imageSrc: pv1i1,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Pent House",
      bhk: "4BHK",
      address: "Barasat, Colony More",
      imageSrc: pv1i2,
      status: "done",
    },
    {
      id: 4,
      title: "Housing Complex",
      bhk: "4BHK",
      address: "Barasat, Colony More",
      imageSrc: pv1i3,
      status: "upcoming",
    },
    {
      id: 5,
      title: "Pent House",
      bhk: "4BHK",
      address: "Barasat, Colony More",
      imageSrc: pv1i4,
      status: "done",
    },
    {
      id: 6,
      title: "Housing Complex",
      bhk: "4BHK",
      address: "Barasat, Colony More",
      imageSrc: pv1i5,
      status: "upcoming",
    },
  ];
  return (
    <>
      <section>
        <div className="w-full mx-auto mb-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* Properties List Column */}
            <div className="lg:col-span-2 space-y-4 max-h-[780px] overflow-y-auto pr-2 custom-scroll-area overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {wishList?.map((property) => (
                  <UserSavedPropertiesCard item={property} />
                ))}
              </div>
            </div>

            {/* Property Visit Indicator Column */}
            <div className="bg-slate-100/70 border border-slate-800 rounded-2xl p-4 md:p-5 max-h-[780px] overflow-y-auto divide-y divide-white/5 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <h3 className="text-xl md:text-3xl font-serif font-semibold text-[#0f1d3a] mb-5">
                Property Visit Indicator
              </h3>
              <div className="space-y-5">
                {visitIndicatorData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5"
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      <div className="w-[120px] h-[90px] rounded-lg overflow-hidden shrink-0 bg-slate-200">
                        <img
                          src={item.imageSrc}
                          alt={`pvi${item.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-0.5 mt-0.5 truncate">
                          <img
                            src={mapPin}
                            alt="map-pin"
                            className="w-3.5 h-3.5 shrink-0 opacity-70"
                          />
                          <span className="truncate">{item.address}</span>
                        </p>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                          {item.bhk}
                        </span>
                      </div>
                    </div>

                    {/* Conditional Indicator Circles */}
                    {item.status === "done" ? (
                      <div className="shrink-0 relative w-16 h-16 flex items-center justify-center rounded-full border-[8px] border-green-500">
                        <span className="text-[10px] font-bold text-green-600 text-center leading-tight">
                          Visit
                          <br />
                          Done
                        </span>
                      </div>
                    ) : (
                      <div className="shrink-0 relative w-16 h-16 flex items-center justify-center rounded-full border-[8px] border-t-transparent border-orange-400 animate-spin-slow">
                        <span className="absolute text-[10px] font-bold text-orange-500 text-center leading-none tracking-tighter">
                          Upcom
                          <br />
                          ing
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Footer */}
        <div className="mt-4 flex items-center text-sm font-medium text-slate-800">
          <span>Recent Activity :</span>
          <div className="relative h-7 w-56 overflow-hidden">
            <div className="activity-line-1 absolute inset-0 flex items-center px-3 whitespace-nowrap">
              You viewed 2BHK in Newtown
            </div>
            <div className="activity-line-2 absolute inset-0 flex items-center px-3 whitespace-nowrap opacity-0">
              Agent replied to your inquiry
            </div>
            <div className="activity-line-3 absolute inset-0 flex items-center px-3 whitespace-nowrap opacity-0">
              Visit scheduled for Sunday
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedProperties;
