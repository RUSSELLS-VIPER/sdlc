import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { useAppSeletor } from "../../../services/helper/reduxstore";
import type { Dispatch, SetStateAction } from "react";
import type { PropertyFilters } from "../properties/PropertySection";

type Props = {
  filters: PropertyFilters;
  setFilters: Dispatch<SetStateAction<PropertyFilters>>;
};

const getCountryFromAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "Unknown";
};

const getCityFromAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts[0] : "Unknown";
};

const FilterDropdown = ({ filters, setFilters }: Props) => {
  const { items } = useAppSeletor((state) => state.property);

  const countries = useMemo(
    () => Array.from(new Set(items.map((item) => getCountryFromAddress(item.address || "")))).filter(Boolean),
    [items]
  );

  const cities = useMemo(() => {
    const filtered = filters.country === "All"
      ? items
      : items.filter((item) => getCountryFromAddress(item.address || "") === filters.country);

    return Array.from(new Set(filtered.map((item) => getCityFromAddress(item.address || "")))).filter(Boolean);
  }, [filters.country, items]);

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.propertyType || item.apartmentType || "--"))).filter(Boolean),
    [items]
  );

  return (
    <div>
      {/* <div className="mb-5 border border-gray-100 rounded-xl px-4 py-3 bg-[#F9FBFC]">
        <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
        <div className="relative">
          <select
            value={filters.country}
            onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value, city: "All" }))}
            className="w-full appearance-none p-2 pl-4 bg-[#202E5C] text-white text-sm font-bold rounded-xl outline-none cursor-pointer"
          >
            <option value="All">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-[10px] pointer-events-none p-4">
            <ChevronDown />
          </span>
        </div>
      </div> */}

      <div className="mb-5 border border-gray-100 rounded-xl px-4 py-3 bg-[#F9FBFC]">
        <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
        <div className="relative">
          <select
            value={filters.city}
            onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full appearance-none p-2 pl-4 bg-[#202E5C] text-white text-sm font-bold rounded-xl outline-none cursor-pointer"
          >
            <option value="All">All</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-[10px] pointer-events-none p-4">
            <ChevronDown />
          </span>
        </div>
      </div>

      <div className="mb-8 border border-gray-100 rounded-xl px-4 py-3 bg-[#F9FBFC]">
        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full appearance-none p-2 pl-4 bg-[#202E5C] text-white text-sm font-bold rounded-xl outline-none cursor-pointer"
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-[10px] pointer-events-none p-4">
            <ChevronDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
