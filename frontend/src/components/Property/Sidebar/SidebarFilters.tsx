import FilterDropdown from "./FilterDropdown";
import FilterCheckbox from "./FilterCheckbox";
import RangeSlider from "./RangeSlider";
import SearchProperties from "./SearchProperties";
import type { Dispatch, SetStateAction } from "react";
import type { PropertyFilters } from "../properties/PropertySection";

type Props = {
  filters: PropertyFilters;
  setFilters: Dispatch<SetStateAction<PropertyFilters>>;
  ranges: {
    minPrice: number;
    maxPrice: number;
    minSqft: number;
    maxSqft: number;
  };
};

const SidebarFilters = ({ filters, setFilters, ranges }: Props) => {
  return (
    <div>
      <div className="bg-[#F0F4F9] rounded-3xl p-6 py-8">
        <FilterDropdown filters={filters} setFilters={setFilters} />
        <FilterCheckbox filters={filters} setFilters={setFilters} />
        <RangeSlider filters={filters} setFilters={setFilters} ranges={ranges} />
        <SearchProperties />
      </div>
    </div>
  );
};

export default SidebarFilters;
