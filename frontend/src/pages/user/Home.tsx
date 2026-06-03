import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/infinity-cmn.css";
import "../../styles/infinity-home.css";
import Navbar from "../../layout/User/Navbar";
import {
  AgentsSection,
  CardsSection,
  FaqSection,
  GallerySection,
  GetInTouchSection,
  TestimonialsSection,
} from "../../components/Home";
import { useAppDispatch, useAppSeletor } from "../../services/helper/reduxstore";
import { getProperties } from "../../store/slices/property.slice";

type SearchFieldKey = "propertyType" | "location" | "bhk" | "budget";

type SearchSelection = Record<SearchFieldKey, string>;

const defaultSearchSelection: SearchSelection = {
  propertyType: "Property Types",
  location: "All locations",
  bhk: "Select BHK",
  budget: "Max Price",
};

const formatCurrency = (value: number) => `Rs.${value.toLocaleString("en-IN")}`;

const getCityFromAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts[0] : "Unknown";
};

const buildBudgetOptions = (prices: number[]) => {
  const sortedPrices = prices.filter((price) => price > 0).sort((a, b) => a - b);

  if (!sortedPrices.length) {
    return [
      { label: "Under Rs.50,00,000", value: "5000000" },
      { label: "Under Rs.1,00,00,000", value: "10000000" },
      { label: "Above Rs.1,00,00,000", value: "100000000" },
    ];
  }

  const minPrice = sortedPrices[0];
  const maxPrice = sortedPrices[sortedPrices.length - 1];
  const span = Math.max(maxPrice - minPrice, 1);
  const firstBand = Math.round(minPrice + span / 3);
  const secondBand = Math.round(minPrice + (span * 2) / 3);

  return [
    { label: `Under ${formatCurrency(firstBand)}`, value: String(firstBand) },
    { label: `Under ${formatCurrency(secondBand)}`, value: String(secondBand) },
    { label: `Under ${formatCurrency(maxPrice)}`, value: String(maxPrice) },
  ];
};

const Home = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSeletor((state) => state.property);

  useEffect(() => {
    const video = document.getElementById("bgVideo") as HTMLVideoElement | null;
    const controlBtn = document.getElementById("videoControlBtn");
    const controlIcon = document.getElementById("controlIcon");

 
    const toggleVideo = () => {
      if (!video || !controlIcon) return;
      if (video.paused) {
        video.play();
        controlIcon.classList.remove("fa-play", "ml-1");
        controlIcon.classList.add("fa-pause");
      } else {
        video.pause();
        controlIcon.classList.remove("fa-pause");
        controlIcon.classList.add("fa-play", "ml-1");
      }
    };

    controlBtn?.addEventListener("click", toggleVideo);
    return () => controlBtn?.removeEventListener("click", toggleVideo);
  }, []);

  useEffect(() => {
    dispatch(getProperties({ projectStatus: "Completed" }));
  }, [dispatch]);

  const propertyTypeOptions = useMemo(() => {
    const seen = new Set<string>();

    return items
      .map((item) => item.propertyType?.trim() || item.apartmentType?.trim() || "")
      .filter((value): value is string => Boolean(value))
      .filter((value) => {
        const key = value.toLowerCase();
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      })
      .map((value) => ({
        label: value,
        value,
      }));
  }, [items]);

  const locationOptions = useMemo(() => {
    const seen = new Set<string>();

    return items
      .map((item) => getCityFromAddress(item.address || ""))
      .filter((value): value is string => Boolean(value))
      .filter((value) => {
        const key = value.toLowerCase();
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      })
      .map((value) => ({
        label: value,
        value,
      }));
  }, [items]);

  const bhkOptions = useMemo(() => {
    const seen = new Set<string>();

    return items
      .map((item) => item.bhk?.trim() || "")
      .filter((value): value is string => Boolean(value))
      .filter((value) => {
        const key = value.toLowerCase();
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      })
      .map((value) => ({
        label: value,
        value,
      }));
  }, [items]);

  const budgetOptions = useMemo(
    () => buildBudgetOptions(items.map((item) => Number(item.price) || 0)),
    [items]
  );

  const [searchSelection, setSearchSelection] = useState<SearchSelection>(defaultSearchSelection);
  const [openField, setOpenField] = useState<SearchFieldKey | null>(null);

  const searchHref = useMemo(() => {
    const params = new URLSearchParams();

    if (searchSelection.propertyType !== defaultSearchSelection.propertyType) {
      params.set("category", searchSelection.propertyType);
    }

    if (searchSelection.location !== defaultSearchSelection.location) {
      params.set("city", searchSelection.location);
    }

    if (searchSelection.bhk !== defaultSearchSelection.bhk) {
      params.set("bhk", searchSelection.bhk);
    }

    if (searchSelection.budget !== defaultSearchSelection.budget) {
      params.set("maxPrice", searchSelection.budget);
    }

    return params.toString() ? `/property?${params.toString()}` : "/property";
  }, [searchSelection]);

  const searchFields: Array<{
    key: SearchFieldKey;
    label: string;
    placeholder: string;
    options: Array<{ label: string; value: string }>;
  }> = [
    {
      key: "propertyType",
      label: "Looking For",
      placeholder: defaultSearchSelection.propertyType,
      options: propertyTypeOptions,
    },
    {
      key: "location",
      label: "Location",
      placeholder: defaultSearchSelection.location,
      options: locationOptions,
    },
    {
      key: "bhk",
      label: "BHK",
      placeholder: defaultSearchSelection.bhk,
      options: bhkOptions,
    },
    {
      key: "budget",
      label: "Your Budget",
      placeholder: defaultSearchSelection.budget,
      options: budgetOptions,
    },
  ];

  const renderDropdown = (field: (typeof searchFields)[number]) => {
    const selectedValue = searchSelection[field.key];
    const selectedLabel =
      field.options.find((option) => option.value === selectedValue)?.label ?? field.placeholder;
    const isOpen = openField === field.key;

    return (
      <div className="flex flex-col gap-1.5 w-full md:w-[calc(50%-0.5rem)] lg:flex-1 relative group">
        <label className="text-[10px] md:text-[11px] font-medium text-white/70 uppercase tracking-widest pl-1 whitespace-nowrap">
          {field.label}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenField((current) => (current === field.key ? null : field.key))}
            className="w-full bg-white/5 border border-white/20 hover:bg-white/10 rounded-xl px-4 py-3.5 flex items-center justify-between transition-all text-left"
          >
            <span className="text-sm font-medium text-white whitespace-nowrap">
              {selectedLabel}
            </span>
            <i className="fa-solid fa-sort text-[#d4af37] text-xs opacity-70 group-hover:opacity-100"></i>
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 left-0 w-full bg-[#111827]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              <ul className="flex flex-col py-1 max-h-64 overflow-y-auto">
                {field.options.length ? (
                  field.options.map((option) => (
                    <li key={option.value}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchSelection((current) => ({
                              ...current,
                              [field.key]: option.value,
                            }));
                            setOpenField(null);
                          }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#d4af37] hover:text-[#111827] transition-colors"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-sm text-gray-400">No options available</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  const [calculatorValue, setCalculatorValue] = useState("0");

  const appendNum = (num: string) => {
    setCalculatorValue((current) =>
      current === "0" || current === "Error" ? num : current + num,
    );
  };

  const appendOp = (op: string) => {
    setCalculatorValue((current) => {
      if (current === "Error") return "0";
      const lastChar = current.slice(-1);
      return ["+", "-", "*", "/"].includes(lastChar)
        ? current.slice(0, -1) + op
        : current + op;
    });
  };

  const clearScreen = () => setCalculatorValue("0");

  const calculate = () => {
    setCalculatorValue((current) => {
      try {
        const result = Function('"use strict"; return (' + current + ")")();
        return Number.isFinite(result) ? String(result) : "Error";
      } catch {
        window.setTimeout(() => setCalculatorValue("0"), 1500);
        return "Error";
      }
    });
  };

  const heroSection = (
    <>
      <div className="relative w-full flex flex-col">
        <div className="absolute  inset-0 z-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          >
            <source
              src="/assets/infinity-home/videos/video-test-1.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-[#111827]/40"></div>
        </div>
        <section className="relative z-10 w-full h-[calc(85vh+112px)] pt-28 flex flex-col">
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full">
            <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-12 drop-shadow-lg text-gray-200">
              Turning Properties into Possibilities
            </p>
            <Link
              to="/property"
              className="group flex items-center gap-4 px-4 py-2 sm:pr-4 pr-4 sm:gap-3 sm:px-6 sm:py-3 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A]"
            >
              <span className="text-sm font-medium whitespace-nowrap">
                View Properties
              </span>

              <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                <i className="fa-solid fa-arrow-right text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"></i>
              </div>
            </Link>
          </main>

          <div className="flex justify-center pb-24 md:pb-32 w-full">
            <div className="w-[20px] h-[34px] border-2 border-white rounded-full flex justify-center pt-1.5 shadow-lg">
              <div className="w-0.5 h-2 bg-white rounded-full animate-scroll-wheel"></div>
            </div>
          </div>
        </section>

        <section className="relative z-20 w-full -mt-16">
          <div className="w-full relative rounded-t-[3rem] md:rounded-t-[5rem] p-6 md:p-8 lg:p-16">
            <div className="absolute inset-0 backdrop-blur-md rounded-t-[3rem] md:rounded-t-[5rem] border-t border-white/30 -z-10"></div>

            <div className="w-full max-w-5xl mx-auto p-6 md:p-8 rounded-2xl border border-white/50 relative z-10">
              <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap items-end justify-between gap-4 lg:gap-6">
                {searchFields.map(renderDropdown)}

                <Link
                  to={searchHref}
                  className="w-full lg:w-auto flex-shrink-0 bg-[#111827] hover:bg-[#d4af37] text-white hover:text-[#111827] px-10 py-3.5 rounded-xl text-sm font-bold tracking-widest transition-all flex items-center justify-center gap-2 lg:gap-3 border border-white/20 shadow-xl mt-2 lg:mt-0"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>{" "}
                  <span>SEARCH</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );

  const logoSliderSection = (
    <>
      <section
        className="overflow-hidden relative py-4 border-y border-gray-300 shadow-inner bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/infinity-home/images/index/scroll.png)",
        }}
      >
        <div className="relative animate-scroll flex items-center gap-3 px-10">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/assets/infinity-home/images/index/eternia.png"
              alt="Eternia"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/spacia.png"
              alt="Spacia"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/primus.png"
              alt="Primus Ganges"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/laguna.png"
              alt="Laguna Bay"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/solus.png"
              alt="Solus"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/o3one.png"
              alt="O3one"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/intellia.png"
              alt="Intellia"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/town-square.png"
              alt="Town Square"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/theroyal.png"
              alt="The Royal Ganges"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/optima.png"
              alt="Optima"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/assets/infinity-home/images/index/eternia.png"
              alt="Eternia"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/spacia.png"
              alt="Spacia"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/primus.png"
              alt="Primus Ganges"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/laguna.png"
              alt="Laguna Bay"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/solus.png"
              alt="Solus"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/o3one.png"
              alt="O3one"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/intellia.png"
              alt="Intellia"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/town-square.png"
              alt="Town Square"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/theroyal.png"
              alt="The Royal Ganges"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <img
              src="/assets/infinity-home/images/index/optima.png"
              alt="Optima"
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
          </div>
        </div>
      </section>
    </>
  );

  const agentsSection = <AgentsSection />;
  
    <>
            <section className="py-[50px] lg:py-20 px-4 sm:px-6 lg:px-12">
                  <div className="max-w-[1320px] mx-auto">
                    <div
                      className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 lg:mb-16 gap-6"
                    >
                      <div>
                        <h2
                          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-2 sm:mb-4"
                        >
                          Meet Our Agents
                        </h2>
                        <p className="text-[#1E1E1E] text-2xl sm:text-xl">
                          Always give you best suggestion
                        </p>
                      </div>
                      <div 
                      // onClick={scrollAgentsRight}
                        className="flex items-center justify-center w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full bg-[#111827] text-amber-500 border-2 hover:bg-white hover:text-black hover:border-black transition-colors"
                      >
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </div>
                    </div>
            
                    <div
                      id="slider-container"
                      className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-pointer select-none pb-8 px-1"
                    >
                      <div
                        className="group relative flex-shrink-0 w-[200px] sm:w-[270px] lg:w-[320px] h-[300px] sm:h-[400px] lg:h-[450px]"
                      >
                        <div
                          className="absolute inset-0 overflow-hidden bg-white border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[120px] group-hover:rounded-[24px] lg:rounded-[160px] lg:group-hover:rounded-[24px]"
                        >
                          <img
                            src="/assets/infinity-home/images/index/agent-1.png"
                            alt="moa1.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                          />
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-end pb-8 lg:pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-white text-base font-bold pt-1">4.9</span>
                              <span className="text-orange-400 text-xl">★</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                              Danial Carter
                            </h3>
                            <p className="text-gray-300 text-xs lg:text-sm mb-2">
                              Field Executive
                            </p>
                            <div
                              className="flex gap-6 items-center justify-center text-[#FCA311] transition-all duration-300 px-5 py-2 border border-white backdrop-blur rounded-2xl"
                            >
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/fb-logo.png"
                                  alt="fb.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/insta-logo.png"
                                  alt="ig.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
            
                      <div
                        className="group relative flex-shrink-0 w-[200px] sm:w-[270px] lg:w-[320px] h-[300px] sm:h-[400px] lg:h-[450px]"
                      >
                        <div
                          className="absolute inset-0 overflow-hidden bg-white border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[120px] group-hover:rounded-[24px] lg:rounded-[160px] lg:group-hover:rounded-[24px]"
                        >
                          <img
                            src="/assets/infinity-home/images/index/agent-2.png"
                            alt="moa2.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                          />
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-end pb-8 lg:pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-white text-base font-bold pt-1">4.9</span>
                              <span className="text-orange-400 text-xl">★</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                              Danial Carter
                            </h3>
                            <p className="text-gray-300 text-xs lg:text-sm mb-2">
                              Field Executive
                            </p>
                            <div
                              className="flex gap-6 items-center justify-center text-[#FCA311] transition-all duration-300 px-5 py-2 border border-white backdrop-blur rounded-2xl"
                            >
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/fb-logo.png"
                                  alt="fb.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/insta-logo.png"
                                  alt="ig.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
            
                      <div
                        className="group relative flex-shrink-0 w-[200px] sm:w-[270px] lg:w-[320px] h-[300px] sm:h-[400px] lg:h-[450px]"
                      >
                        <div
                          className="absolute inset-0 overflow-hidden bg-white border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[120px] group-hover:rounded-[24px] lg:rounded-[160px] lg:group-hover:rounded-[24px]"
                        >
                          <img
                            src="/assets/infinity-home/images/index/agent-3.png"
                            alt="moa3.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                          />
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-end pb-8 lg:pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-white text-base font-bold pt-1">4.9</span>
                              <span className="text-orange-400 text-xl">★</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                              Danial Carter
                            </h3>
                            <p className="text-gray-300 text-xs lg:text-sm mb-2">
                              Field Executive
                            </p>
                            <div
                              className="flex gap-6 items-center justify-center text-[#FCA311] transition-all duration-300 px-5 py-2 border border-white backdrop-blur rounded-2xl"
                            >
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/fb-logo.png"
                                  alt="fb.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/insta-logo.png"
                                  alt="ig.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
            
                      <div
                        className="group relative flex-shrink-0 w-[200px] sm:w-[270px] lg:w-[320px] h-[300px] sm:h-[400px] lg:h-[450px]"
                      >
                        <div
                          className="absolute inset-0 overflow-hidden bg-white border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[120px] group-hover:rounded-[24px] lg:rounded-[160px] lg:group-hover:rounded-[24px]"
                        >
                          <img
                            src="/assets/infinity-home/images/index/agent-4.png"
                            alt="moa4.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                          />
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-end pb-8 lg:pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-white text-base font-bold pt-1">4.9</span>
                              <span className="text-orange-400 text-xl">★</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                              Danial Carter
                            </h3>
                            <p className="text-gray-300 text-xs lg:text-sm mb-2">
                              Field Executive
                            </p>
                            <div
                              className="flex gap-6 items-center justify-center text-[#FCA311] transition-all duration-300 px-5 py-2 border border-white backdrop-blur rounded-2xl"
                            >
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/fb-logo.png"
                                  alt="fb.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                              <Link  to="#" className="hover:scale-110 transition-transform">
                                <img
                                  src="/assets/infinity-home/images/index/insta-logo.png"
                                  alt="ig.png"
                                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            
                  
                </section>
          </>
  

  

  const videoSection = (
    <>
      <section>
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900">
          <video
            id="bgVideo"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            loop
            muted
            playsInline
          >
            <source
              src="/assets/infinity-home/videos/video-test-1.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
          <div className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 w-full max-w-[1320px] mx-auto text-center">
            <button
              id="videoControlBtn"
              className="group bg-white rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-100 border-2 hover:border-amber-500 focus:outline-none"
            >
              <i
                id="controlIcon"
                className="fa-solid fa-play text-[#111827] group-hover:text-amber-500 text-xl sm:text-2xl md:text-3xl ml-1 transition-all duration-300"
              ></i>
            </button>

            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-snug md:leading-tight mt-6 md:mt-8 max-w-3xl">
              Experience Our Professional <br className="hidden sm:block" />
              Real Estate Approach
            </h1>
          </div>
        </div>
      </section>
    </>
  );

  const qrCodeSection = (
    <>
      <section className="bg-white flex items-center justify-center min-h-[372px] p-0">
        <div className="w-full max-w-7xl bg-white overflow-hidden flex flex-col md:flex-row items-center justify-between px-3 md:px-20 py-10 md:py-0 md:h-[372px]">
          <div className="flex flex-col items-center md:items-center gap-6 order-2 md:order-1 mt-10 md:mt-0">
            <div className="flex gap-4">
              <Link
                to="#"
                className="w-12 h-12 rounded-full bg-[#1a2b3c] flex items-center justify-center text-orange-400 cursor-pointer hover:bg-transparent border-2 hover:border-amber-500 transition-colors"
              >
                <i className="fa-brands fa-android"></i>
              </Link>
              <Link
                to="#"
                className="w-12 h-12 rounded-full bg-[#1a2b3c] flex items-center justify-center text-orange-400 cursor-pointer hover:bg-transparent border-2 hover:border-amber-500 transition-colors"
              >
                <i className="fa-brands fa-apple"></i>
              </Link>
            </div>
            <Link
              to="#"
              className="group flex items-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border border-transparent hover:border-[#0F172A]"
            >
              <span className="text-sm font-medium whitespace-nowrap">
                Download App
              </span>

              <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                <i className="fa-solid fa-arrow-right text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"></i>
              </div>
            </Link>
          </div>

          <div className="flex-1 text-center px-4 md:px-12 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl text-[#1a2b3c] mb-6 leading-tight">
              Stay ahead of the ordinary!
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
              “Explore properties made easy - grab our app for deals, speed and
              convenience.”
            </p>
          </div>

          <div className="order-3 mt-10 md:mt-0">
            <div className="w-[220px] bg-[#1a2b3c] p-3 rounded-[40px] shadow-l">
              <div className="bg-white rounded-[32px] py-10 px-2 flex flex-col items-center">
                <div className="w-full aspect-square bg-gray-50 flex items-center justify-center p-2 mb-6">
                  <img
                    src="/assets/infinity-home/images/index/qr-code.png"
                    alt="QR Code"
                    className="w-full h-full grayscale opacity-80"
                  />
                </div>
                <span className="text-2xl font-bold text-[#1a2b3c]">
                  Scan Me
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const articleSection = (
    <>
      <section className="py-16 px-6 bg-[#f3f6f9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl text-[#1a2b3c] mb-4">
                News & Articles
              </h2>
              <p className="text-gray-600 text-lg">
                See our latest real estate related news.
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                to="#"
                className="group flex items-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border border-transparent hover:border-[#0F172A]"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  Brows All Blog
                </span>

                <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                  <i className="fa-solid fa-arrow-right text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"></i>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/assets/infinity-home/images/index/news-article-img-1.png"
                  alt="Modern House"
                  className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>Apr 18, 2026</span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>4min read</span>
              </div>
              <p className="text-[#1a2b3c] font-medium leading-relaxed mb-6">
                There are many variations of passages of Lorem Ipsum available
              </p>
              <button className="border border-gray-300 px-8 py-2.5 rounded-lg text-[#1a2b3c] font-medium hover:bg-[#1a2b3c] hover:text-white transition-colors">
                Read More
              </button>
            </div>

            <div className="group">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/assets/infinity-home/images/index/news-article-img-2.png"
                  alt="Luxury Estate"
                  className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>Apr 18, 2026</span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>4min read</span>
              </div>
              <p className="text-[#1a2b3c] font-medium leading-relaxed mb-6">
                There are many variations of passages of Lorem Ipsum available
              </p>
              <button className="border border-gray-300 px-8 py-2.5 rounded-lg text-[#1a2b3c] font-medium hover:bg-[#1a2b3c] hover:text-white transition-colors">
                Read More
              </button>
            </div>

            <div className="group">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/assets/infinity-home/images/index/news-article-img-3.jpg"
                  alt="Luxury Estate"
                  className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>Apr 18, 2026</span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>4min read</span>
              </div>
              <p className="text-[#1a2b3c] font-medium leading-relaxed mb-6">
                There are many variations of passages of Lorem Ipsum available
              </p>
              <button className="border border-gray-300 px-8 py-2.5 rounded-lg text-[#1a2b3c] font-medium hover:bg-[#1a2b3c] hover:text-white transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const calculatorSection = (
    <>
      <section className="py-6 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl text-[#1a2b3c] mb-8 md:mb-16 text-center md:text-left">
            Find The Best home With Us
          </h2>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-[#f3f6f9] rounded-[1.5rem] sm:rounded-[40px] p-5 sm:p-8 md:p-12 shadow-sm flex items-center justify-between relative overflow-hidden group min-h-[200px] sm:min-h-[260px]">
              <div className="flex-1 text-left z-20 max-w-[60%] sm:max-w-[55%]">
                <h3 className="text-lg sm:text-2xl font-semibold text-[#1a2b3c] mb-2 sm:mb-4">
                  Consultation
                </h3>
                <p className="text-gray-600 leading-snug sm:leading-relaxed mb-5 sm:mb-10 text-xs sm:text-lg">
                  We are ready to help, Consult your property options with us.
                </p>
                <Link
                  to="#"
                  className="bg-transparent border border-[#1a2b3c] text-[#1a2b3c] px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 hover:bg-[#1a2b3c] hover:text-white transition-all group/btn w-max"
                >
                  <span className="text-[11px] sm:text-sm font-medium whitespace-nowrap">
                    Start Chat
                  </span>

                  <span className="flex justify-center text-[#fca311] group-hover/btn:text-white">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
              <img
                src="/assets/infinity-home/images/index/consult-women.png"
                alt="Consultant"
                className="absolute -right-4 sm:right-0 bottom-0 h-[65%] sm:h-[90%] object-contain pointer-events-none group-hover:scale-105 transition-transform duration-500 z-10"
              />
            </div>

            <div className="bg-[#f3f6f9] rounded-[1.5rem] sm:rounded-[40px] p-5 sm:p-8 md:p-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden group gap-6 sm:gap-0">
              <div className="flex-1 text-left z-20 w-full sm:max-w-[50%]">
                <h3 className="text-lg sm:text-2xl font-semibold text-[#1a2b3c] mb-2 sm:mb-4">
                  Calculator
                </h3>
                <p className="text-gray-600 leading-snug sm:leading-relaxed mb-5 sm:mb-10 text-xs sm:text-lg">
                  We are ready to help, Consult your property options with us.
                </p>
                <Link
                  to="#"
                  className="bg-transparent border border-[#1a2b3c] text-[#1a2b3c] px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 hover:bg-[#1a2b3c] hover:text-white transition-all group/btn w-max"
                >
                  <span className="text-[11px] sm:text-sm font-medium whitespace-nowrap">
                    Calculate
                  </span>

                  <span className="flex justify-center text-[#fca311] group-hover/btn:text-white">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>

              <div className="w-full max-w-[200px] bg-[#4b5563] rounded-[1.25rem] sm:rounded-3xl p-3 sm:p-4 shadow-xl z-10 self-center sm:self-auto">
                <div
                  id="screen"
                  className="w-full h-10 sm:h-12 bg-[#d1d8a7] rounded-lg mb-3 sm:mb-4 flex items-center justify-end px-3 text-lg sm:text-xl font-mono text-slate-800 overflow-hidden shadow-inner border border-black/10"
                >
                  {calculatorValue}
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-white text-center text-xs">
                  <div
                    onClick={clearScreen}
                    className="calc-btn bg-[#6b7280] col-span-1 py-2 rounded-md cursor-pointer select-none active:scale-95 transition-all"
                  >
                    C
                  </div>
                  <div
                    onClick={() => appendOp("/")}
                    className="calc-btn bg-[#9ca3af]/30 py-2 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    ÷
                  </div>
                  <div
                    onClick={() => appendOp("*")}
                    className="calc-btn bg-[#9ca3af]/30 py-2 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    ×
                  </div>
                  <div
                    onClick={() => appendOp("-")}
                    className="calc-btn bg-[#9ca3af]/30 py-2 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    -
                  </div>

                  <div
                    onClick={() => appendNum("7")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    7
                  </div>
                  <div
                    onClick={() => appendNum("8")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    8
                  </div>
                  <div
                    onClick={() => appendNum("9")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    9
                  </div>
                  <div
                    onClick={() => appendOp("+")}
                    className="calc-btn bg-[#9ca3af]/30 py-2 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    +
                  </div>

                  <div
                    onClick={() => appendNum("4")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    4
                  </div>
                  <div
                    onClick={() => appendNum("5")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    5
                  </div>
                  <div
                    onClick={() => appendNum("6")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    6
                  </div>
                  <div
                    onClick={calculate}
                    className="calc-btn bg-white/20 py-2 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/30 transition-all font-bold"
                  >
                    =
                  </div>

                  <div
                    onClick={() => appendNum("1")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    1
                  </div>
                  <div
                    onClick={() => appendNum("2")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    2
                  </div>
                  <div
                    onClick={() => appendNum("3")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    3
                  </div>
                  <div
                    onClick={() => appendNum("0")}
                    className="calc-btn bg-[#6b7280]/20 py-2.5 sm:py-3 rounded-md cursor-pointer select-none active:scale-95 hover:bg-white/20 transition-all"
                  >
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="w-full text-white overflow-hidden">
      <Navbar />
      {heroSection}
      <CardsSection />
      {logoSliderSection}
      <GallerySection />
      {agentsSection}
      {videoSection}
      <TestimonialsSection />
      {qrCodeSection}
      {articleSection}
      {calculatorSection}
      <GetInTouchSection />
      <FaqSection />
    </div>
  );
};

export default Home;



