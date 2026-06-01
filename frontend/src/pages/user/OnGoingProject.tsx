import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Hero from "../../components/Property/Hero";
import BrokerList from "../../components/Property/Sidebar/BrokerList";
import Pagination from "../../components/Property/properties/Pagination";
import OnGoingProjectCard from "../../components/onGoingProject/OnGoingProjectCard";
import ongoingbg from "../../assets/images/ongoing-projects/ongoing-bg.png";
import { useAppDispatch, useAppSeletor } from "../../services/helper/reduxstore";
import { getProperties } from "../../store/slices/property.slice";
import type { PropertyItem } from "../../type/type/property/property";

const pageSize = 6;

type FilterState = {
  city: string;
  area: string;
  projectType: string;
  statuses: string[];
  maxPrice: number;
  maxSqft: number;
};

const parseNumericValue = (value: string | number | undefined) => {
  if (typeof value === "number") {
    return value;
  }
  return Number(String(value ?? "").replace(/[^\d.]/g, "")) || 0;
};

const getAddressParts = (address: string) =>
  address.split(",").map((part) => part.trim()).filter(Boolean);

const getCityFromAddress = (address: string) => {
  const parts = getAddressParts(address);
  return parts.length ? parts[0] : "Unknown";
};

const getAreaFromAddress = (address: string) => {
  const parts = getAddressParts(address);
  if (parts.length > 1) {
    return parts[1];
  }
  return parts.length ? parts[0] : "Unknown";
};

const toggleSelection = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

const OnGoingProject = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSeletor((state) => state.property);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    city: "All",
    area: "All",
    projectType: "All",
    statuses: [],
    maxPrice: 0,
    maxSqft: 0,
  });
  

  useEffect(() => {
    dispatch(getProperties({ projectStatus: "Ongoing" }));
  }, [dispatch]);

  const ongoingProperties = useMemo(
    () =>
      items.filter(
        (item) =>
          (item.projectStatus ?? "Completed").trim().toLowerCase() === "ongoing",
      ),
    [items],
  );

  const cityOptions = useMemo(
    () => Array.from(new Set(ongoingProperties.map((item) => getCityFromAddress(item.address || "")))).filter(Boolean),
    [ongoingProperties],
  );

  const areaOptions = useMemo(
    () =>
      Array.from(new Set(ongoingProperties.map((item) => getAreaFromAddress(item.address || "")))).filter(Boolean),
    [ongoingProperties],
  );

  const projectTypeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          ongoingProperties.map((item) => (item.propertyType || item.apartmentType || "--").trim()).filter(Boolean),
        ),
      ),
    [ongoingProperties],
  );

  const statusOptions = useMemo(
    () => Array.from(new Set(ongoingProperties.map((item) => item.status || "Available"))).filter(Boolean),
    [ongoingProperties],
  );

  const derivedRanges = useMemo(() => {
    const prices = ongoingProperties
      .map((item) => parseNumericValue(item.price))
      .filter((value) => value > 0);
    const sqfts = ongoingProperties
      .map((item) => parseNumericValue(item.sqft))
      .filter((value) => value > 0);

    return {
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      minSqft: sqfts.length ? Math.min(...sqfts) : 0,
      maxSqft: sqfts.length ? Math.max(...sqfts) : 0,
    };
  }, [ongoingProperties]);

  const filteredProperties = useMemo(() => {
    return ongoingProperties.filter((item) => {
      const cityMatch =
        filters.city === "All" || getCityFromAddress(item.address || "") === filters.city;
      const areaMatch =
        filters.area === "All" || getAreaFromAddress(item.address || "") === filters.area;
      const projectType = (item.propertyType || item.apartmentType || "--").trim();
      const projectTypeMatch =
        filters.projectType === "All" || projectType === filters.projectType;
      const statusMatch =
        !filters.statuses.length || filters.statuses.includes(item.status || "Available");
      const priceMatch =
        !filters.maxPrice || parseNumericValue(item.price) <= filters.maxPrice;
      const sqftMatch =
        !filters.maxSqft || parseNumericValue(item.sqft) <= filters.maxSqft;

      return cityMatch && areaMatch && projectTypeMatch && statusMatch && priceMatch && sqftMatch;
    });
  }, [filters, ongoingProperties]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [currentPage, filteredProperties]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <>
      <Hero
        title="Ongoing Projects"
        breadcrumbLabel="Ongoing Projects"
        backgroundImage={ongoingbg}
      />

      <main className="bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              className="bg-[#202E5C] text-white rounded-xl border-2 border-[#202E5C] hover:bg-white hover:text-[#202E5C] transition-all duration-300 px-6 py-2 font-medium text-sm"
            >
              Ongoing
            </button>
            <NavLink
              to="/property"
              className="bg-white text-gray-600 rounded-xl border-2 border-gray-200 hover:border-[#202E5C] hover:text-[#202E5C] transition-all duration-300 px-6 py-2 font-medium text-sm"
            >
              Completed
            </NavLink>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <aside className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-6">
              <div className="bg-[#F0F4F9] rounded-3xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <h2 className="text-xl font-bold mb-6 text-gray-800">
                  Filter Projects
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <div className="relative">
                      <select
                        value={filters.city}
                        onChange={(event) =>
                          setFilters((prev) => ({ ...prev, city: event.target.value }))
                        }
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 appearance-none focus:outline-none focus:border-gray-400 text-gray-600 text-sm bg-white"
                      >
                        <option value="All">All</option>
                        {cityOptions.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Area
                    </label>
                    <div className="relative">
                      <select
                        value={filters.area}
                        onChange={(event) =>
                          setFilters((prev) => ({ ...prev, area: event.target.value }))
                        }
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 appearance-none focus:outline-none focus:border-gray-400 text-gray-600 text-sm bg-white"
                      >
                        <option value="All">All</option>
                        {areaOptions.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        value={filters.projectType}
                        onChange={(event) =>
                          setFilters((prev) => ({
                            ...prev,
                            projectType: event.target.value,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 appearance-none focus:outline-none focus:border-gray-400 text-gray-600 text-sm bg-white"
                      >
                        <option value="All">All</option>
                        {projectTypeOptions.map((projectType) => (
                          <option key={projectType} value={projectType}>
                            {projectType}
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-700 mb-3">
                    Status
                  </label>
                  <div className="space-y-2.5">
                    {statusOptions.map((status) => (
                      <label key={status} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D]"
                          checked={filters.statuses.includes(status)}
                          onChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              statuses: toggleSelection(prev.statuses, status),
                            }))
                          }
                        />
                        <span className="text-sm text-gray-600">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Price Range (₹)
                  </label>
                  <div className="border-2 border-[#FCAA31] rounded-xl p-3 pt-4 bg-white">
                    <input
                      type="range"
                      min={derivedRanges.minPrice || 0}
                      max={derivedRanges.maxPrice || derivedRanges.minPrice || 0}
                      value={filters.maxPrice || derivedRanges.maxPrice || 0}
                      onChange={(event) =>
                        setFilters((prev) => ({ ...prev, maxPrice: Number(event.target.value) }))
                      }
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-medium text-gray-500 mt-2">
                      <span>{derivedRanges.minPrice.toLocaleString("en-IN") || "0"}</span>
                      <span>{derivedRanges.maxPrice.toLocaleString("en-IN") || "0"}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Area (Sq Ft)
                  </label>
                  <div className="border-2 border-[#FCAA31] rounded-xl p-3 pt-4 bg-white">
                    <input
                      type="range"
                      min={derivedRanges.minSqft || 0}
                      max={derivedRanges.maxSqft || derivedRanges.minSqft || 0}
                      value={filters.maxSqft || derivedRanges.maxSqft || 0}
                      onChange={(event) =>
                        setFilters((prev) => ({ ...prev, maxSqft: Number(event.target.value) }))
                      }
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-medium text-gray-500 mt-2">
                      <span>{derivedRanges.minSqft}</span>
                      <span>{derivedRanges.maxSqft}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="w-full bg-[#202E5C] text-white rounded-xl border-2 border-[#202E5C] hover:bg-white hover:text-[#202E5C] transition-all duration-300 px-6 py-2 font-medium text-sm"
                >
                  Search Projects
                </button>
              </div>

              <BrokerList />
            </aside>

            <section className="flex-1 w-full">
              {loading && <p className="text-slate-600 mb-6">Loading ongoing properties...</p>}
              {error && <p className="text-red-600 mb-6">{error}</p>}

              {!loading && !error && filteredProperties.length === 0 && (
                <p className="text-slate-600 mb-6">No ongoing properties have been added yet.</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedProjects.map((project: PropertyItem) => (
                  <OnGoingProjectCard key={project._id} project={project} />
                ))}
              </div>

              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default OnGoingProject;
