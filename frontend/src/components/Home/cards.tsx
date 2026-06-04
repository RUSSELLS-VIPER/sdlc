import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { Heart, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getWishList, toggleLikeUnlike } from "../../store/slices/user.slice";
import HomeOnGoingProjectCard from "./HomeOnGoingProjectCard";

export const CardsSection = () => {
  const { items, loading, error } = useAppSeletor((state) => state.property);
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<
    "all" | "home" | "apartment" | "villa" | "office"
  >("all");
  const navigate = useNavigate();
  const { user, token } = useAppSeletor((state) => state.auth);
  const { favouritesPropertyIds } = useAppSeletor((state) => state.users);


  

  const popularCategories = [
    { label: "All", value: "all" as const },
    { label: "House", value: "home" as const },
    { label: "Apartment", value: "apartment" as const },
    { label: "Villa", value: "villa" as const },
    { label: "Office", value: "office" as const },
  ];

  const filteredPopularItems = useMemo(() => {
    const completedItems = items.filter(
      (item) =>
        (item.projectStatus ?? "Completed").trim().toLowerCase() ===
        "completed",
    );
    if (activeCategory === "all") return completedItems;
    return completedItems.filter(
      (item) => item.propertyType === activeCategory,
    );
  }, [activeCategory, items]);

  const categoryImageMap: Record<string, string> = {
    home: "/assets/infinity-home/images/index/house-img.png",
    apartment: "/assets/infinity-home/images/index/apartment-img.png",
    villa: "/assets/infinity-home/images/index/villa-img.png",
    office: "/assets/infinity-home/images/index/villa-img.png",
    rental: "/assets/infinity-home/images/index/apartment-img.png",
    other: "/assets/infinity-home/images/index/house-img.png",
  };

  const dynamicCategories = useMemo(() => {
    const counts: Record<string, number> = {};

    items.forEach((item) => {
      const rawType = item.propertyType?.trim().toLowerCase();
      const key = rawType && rawType !== "--" ? rawType : "other";
      counts[key] = (counts[key] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([key, count]) => ({
        key,
        count,
        label:
          key === "other"
            ? "Other"
            : key.charAt(0).toUpperCase() + key.slice(1),
        image: categoryImageMap[key] ?? categoryImageMap.other,
      }))
      .sort((a, b) => b.count - a.count);
  }, [items]);

  useEffect(() => {
    
    if (token) {
      dispatch(getWishList());
    }
  }, [dispatch, token]);

  const handleWishList = async (id: string) => {
    if (!user && !token) {
      toast.success("Please Login First to like a property");
      navigate("/login")
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

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | null,
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
    ) => {
      if (!el) return;
      el.addEventListener(type, handler as EventListener);
      cleanups.push(() =>
        el.removeEventListener(type, handler as EventListener),
      );
    };

    const projectsSlider = document.getElementById("projects-slider");
    const scrollAmount = 424;

    on(document.getElementById("prev-btn"), "click", () => {
      if (!projectsSlider) return;
      if (projectsSlider.scrollLeft <= 10) {
        projectsSlider.scrollTo({
          left: projectsSlider.scrollWidth,
          behavior: "smooth",
        });
      } else {
        projectsSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    });

    on(document.getElementById("next-btn"), "click", () => {
      if (!projectsSlider) return;
      const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;
      projectsSlider.scrollTo({
        left:
          projectsSlider.scrollLeft >= maxScroll - 10
            ? 0
            : projectsSlider.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    });

    document.querySelectorAll<HTMLElement>(".drag-slider").forEach((slider) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      on(slider, "mousedown", (event) => {
        isDown = true;
        startX = event.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.scrollBehavior = "auto";
      });
      on(slider, "mouseleave", () => {
        isDown = false;
      });
      on(slider, "mouseup", () => {
        isDown = false;
        slider.style.scrollBehavior = "smooth";
      });
      on(slider, "mousemove", (event) => {
        if (!isDown) return;
        event.preventDefault();
        const walk = (event.pageX - slider.offsetLeft - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      <section className="bg-[#f3f6f9] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row items-center w-full relative">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-12 space-y-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#161d2d] mb-6">
                  <span className="text-gray-400 font-light">#</span>Trusted By
                  1 Million Clients
                </h2>
                <p className="text-lg text-[#475569] max-w-lg leading-relaxed">
                  Helping people fine the perfect home with trusted guidance,
                  market expertise and seamless property solutions.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex -space-x-4">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="/assets/infinity-home/images/index/client-img-1.png"
                    alt="Buyer 1"
                  />
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="/assets/infinity-home/images/index/client-img-2.png"
                    alt="Buyer 2"
                  />
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="/assets/infinity-home/images/index/client-img-3.png"
                    alt="Buyer 3"
                  />
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="/assets/infinity-home/images/index/client-img-4.png"
                    alt="Buyer 4"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#161d2d] mb-1">
                      1M
                    </div>
                    <div className="text-[13px] text-[#475569] font-medium">
                      Happy buyers
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#161d2d] mb-1">
                      100K
                    </div>
                    <div className="text-[13px] text-[#475569] font-medium">
                      Clients reviews
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#161d2d] mb-1">
                      4.8
                    </div>
                    <div className="text-[13px] text-[#475569] font-medium">
                      Positive rating
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#161d2d] mb-1">
                      8 Lakh
                    </div>
                    <div className="text-[13px] text-[#475569] font-medium">
                      Project Covered
                    </div>
                  </div>
                </div>
              </div>

              <button className="px-8 py-2.5 border border-gray-300 rounded-lg text-sm text-[#161d2d] font-medium hover:bg-[#161d2d] hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="w-full lg:w-1/2 h-[580px] custom-scrollbar overflow-y-auto [direction:rtl] mt-16 lg:mt-0">
              <div className="[direction:ltr] ml-8 lg:ml-16 space-y-6 pb-4">
                <div className="relative bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] group hover:bg-[#161d2d] hover:-translate-x-1 transition-all duration-300 cursor-pointer border border-transparent">
                  <div className="flex gap-4 md:gap-5">
                    <div className="shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="pb-10 md:pb-12">
                      <h3 className="text-lg md:text-xl lg:text-[22px] font-semibold text-[#161d2d] group-hover:text-white leading-snug transition-colors duration-300">
                        Two Decades Of Building Excellence and Trust
                      </h3>
                      <p className="mt-2 md:mt-3 text-xs md:text-sm text-[#475569] group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                        Infinity Horizon has evolved to become one of the
                        leading Real Estate developers in Eastern India and
                        parts of Southern India.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-9 h-9 md:w-11 md:h-11 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-lg md:rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-md">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transform -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="relative bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] group hover:bg-[#161d2d] hover:-translate-x-1 transition-all duration-300 cursor-pointer border border-transparent">
                  <div className="flex gap-4 md:gap-5">
                    <div className="shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="pb-10 md:pb-12">
                      <h3 className="text-lg md:text-xl lg:text-[22px] font-semibold text-[#161d2d] group-hover:text-white leading-snug transition-colors duration-300">
                        Two Decades Of Building Excellence and Trust
                      </h3>
                      <p className="mt-2 md:mt-3 text-xs md:text-sm text-[#475569] group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                        Infinity Horizon has evolved to become one of the
                        leading Real Estate developers in Eastern India and
                        parts of Southern India.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-9 h-9 md:w-11 md:h-11 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-lg md:rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-md">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transform -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="relative bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] group hover:bg-[#161d2d] hover:-translate-x-1 transition-all duration-300 cursor-pointer border border-transparent">
                  <div className="flex gap-4 md:gap-5">
                    <div className="shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="pb-10 md:pb-12">
                      <h3 className="text-lg md:text-xl lg:text-[22px] font-semibold text-[#161d2d] group-hover:text-white leading-snug transition-colors duration-300">
                        Two Decades Of Building Excellence and Trust
                      </h3>
                      <p className="mt-2 md:mt-3 text-xs md:text-sm text-[#475569] group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                        Infinity Horizon has evolved to become one of the
                        leading Real Estate developers in Eastern India and
                        parts of Southern India.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-9 h-9 md:w-11 md:h-11 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-lg md:rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-md">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transform -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="relative bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] group hover:bg-[#161d2d] hover:-translate-x-1 transition-all duration-300 cursor-pointer border border-transparent">
                  <div className="flex gap-4 md:gap-5">
                    <div className="shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="pb-10 md:pb-12">
                      <h3 className="text-lg md:text-xl lg:text-[22px] font-semibold text-[#161d2d] group-hover:text-white leading-snug transition-colors duration-300">
                        Two Decades Of Building Excellence and Trust
                      </h3>
                      <p className="mt-2 md:mt-3 text-xs md:text-sm text-[#475569] group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                        Infinity Horizon has evolved to become one of the
                        leading Real Estate developers in Eastern India and
                        parts of Southern India.
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-9 h-9 md:w-11 md:h-11 bg-[#161d2d] group-hover:bg-white group-hover:text-[#161d2d] rounded-lg md:rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-md">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transform -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight">
              Popular Listings
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-slate-800 text-lg">
                Infinity Horizon's most popular watchlists. View all 2412
                listings
              </p>
              <Link
                to={"/property"}
                className="flex items-center justify-center w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full bg-[#111827] text-amber-500 border-2 hover:bg-white hover:text-black hover:border-black transition-colors"
              >
                <i className="fa-solid fa-arrow-right text-xs sm:text-sm md:text-base"></i>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {popularCategories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className={`px-6 py-2.5 rounded-full border font-medium text-sm transition ${
                  activeCategory === category.value
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-400 text-slate-700 bg-transparent hover:border-slate-800 hover:text-slate-900"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="drag-slider flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-8 select-none">
            {loading && <p className="text-slate-600">Loading properties...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && filteredPopularItems.length === 0 && (
              <p className="text-slate-600">
                No properties found for this category.
              </p>
            )}

            {!loading &&
              !error &&
              filteredPopularItems.map((item) => (
                <div
                  key={item._id}
                  className="w-[85vw] sm:w-[380px] md:w-[410px] flex-shrink-0 bg-[#f8fafc] rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                >
                  <div className="relative h-[220px] bg-gray-200">
                    <img
                      src={
                        item.image ||
                        "/assets/infinity-home/images/index/house-img.png"
                      }
                      alt="Duplex House"
                      className="w-full h-full object-cover pointer-events-none"
                      draggable={false}
                    />
                    <div className="absolute top-4 left-0 bg-[#f59e0b] text-white text-xs font-bold px-4 py-1.5 ribbon pr-6">
                      Special Offers
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-slate-800 font-medium text-sm">
                          <MapPin className=" text-[#0F172A] text-sm" />
                          {item.address}
                        </div>
                        <button
                          className="text-slate-900 hover:text-red-500 transition"
                          onClick={() => handleWishList(String(item._id))}
                        >
                          <Heart
                            className={`text-sm ${favouritesPropertyIds.includes(String(item._id)) ? "fill-yellow-400 " : ""}`}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-6">
                      Size:
                      <span className="font-semibold text-slate-800">
                        {item.sqft || "--"}
                      </span>
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <p className="text-slate-600 text-sm">
                        Start From:
                        <span className="font-bold text-slate-900">
                          ₹{item.price}
                        </span>
                      </p>

                      <button
                        onClick={() => {
                          if(!token && !user){
                            toast.success("Please Login first to see profile details")
                            navigate("/login")
                            return 
                          }
                          navigate(`/property/${item._id}`)}}
                        className="bg-[#171e2e] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#facc15] hover:text-[#171E2E] transform hover:-translate-x-2 shadow hover:shadow-md transition-all duration-200"
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

      <section className="py-8 bg-[#f3f6f9]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight">
              Listing Categories
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-slate-800 text-lg">
                Type of our property View All {items.length} listings
              </p>
              <Link
                to={"/property"}
                className="flex items-center justify-center w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full bg-[#111827] text-amber-500 border-2 hover:bg-white hover:text-black hover:border-black transition-colors"
              >
                <i className="fa-solid fa-arrow-right text-xs sm:text-sm md:text-base"></i>
              </Link>
            </div>
          </div>

          <div className="drag-slider flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-8 select-none">
            {loading && <p className="text-slate-600">Loading categories...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && dynamicCategories.length === 0 && (
              <p className="text-slate-600">No categories found.</p>
            )}
            {!loading &&
              !error &&
              dynamicCategories.map((category) => (
                <div
                  key={category.key}
                  className="flex w-[85vw] sm:w-[320px] md:w-[380px] lg:w-[410px] flex-shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
                >
                  <div className="w-[130px] sm:w-[150px] h-[130px] sm:h-[150px] flex-shrink-0">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover pointer-events-none rounded-2xl"
                      draggable={false}
                    />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-1.5">
                      {category.label}
                    </h3>
                    <p className="text-slate-600 font-medium text-sm">
                      {category.count} listings
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl text-slate-900 mb-5 tracking-tight">
              Our Ongoing Projects
            </h2>
            <p className="text-slate-800 text-lg mb-10 leading-relaxed max-w-sm">
              Building tomorrow's is our motto & we have been doing exactly
              that.
            </p>

            <div className="flex gap-4">
              <button
                id="prev-btn"
                className="flex items-center justify-center w-12 h-12 bg-[#111827] rounded-full hover:bg-slate-800 transform hover:-translate-x-1 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg"
              >
                <i className="fa-solid fa-arrow-left text-[#eab308] text-sm md:text-base"></i>
              </button>
              <button
                id="next-btn"
                className="flex items-center justify-center w-12 h-12 bg-[#e2e8f0] border border-slate-300 rounded-full hover:bg-slate-200 transform hover:translate-x-1 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none shadow-sm hover:shadow-md"
              >
                <i className="fa-solid fa-arrow-right text-[#eab308] text-sm md:text-base"></i>
              </button>
            </div>
          </div>

          <HomeOnGoingProjectCard />
        </div>
      </section>
    </>
  );
};
