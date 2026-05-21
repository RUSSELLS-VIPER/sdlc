import { useMemo } from "react";
import { useAppSeletor } from "../../../services/helper/reduxstore";
import type { Dispatch, SetStateAction } from "react";
import type { PropertyFilters } from "../properties/PropertySection";

type Props = {
  filters: PropertyFilters;
  setFilters: Dispatch<SetStateAction<PropertyFilters>>;
};

const toggleSelection = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

const FilterCheckbox = ({ filters, setFilters }: Props) => {
  const { items } = useAppSeletor((state) => state.property);

  const bhkOptions = useMemo(
    () => Array.from(new Set(items.map((item) => item.bhk || "--"))).filter(Boolean),
    [items]
  );

  const apartmentOptions = useMemo(
    () => Array.from(new Set(items.map((item) => item.apartmentType || "--"))).filter(Boolean),
    [items]
  );

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#171E2E] mb-3">BHK</label>
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          {bhkOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-gray-600 font-medium cursor-pointer">
              <input
                type="checkbox"
                className="bg-black accent-[#171E2E] w-5 h-5 rounded border-2"
                checked={filters.bhk.includes(option)}
                onChange={() => setFilters((prev) => ({ ...prev, bhk: toggleSelection(prev.bhk, option) }))}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-[#171E2E] mb-3">Apartment</label>
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          {apartmentOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-gray-600 font-medium cursor-pointer">
              <input
                type="checkbox"
                className="bg-black accent-[#171E2E] w-5 h-5 rounded border-2"
                checked={filters.apartment.includes(option)}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, apartment: toggleSelection(prev.apartment, option) }))
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCheckbox;
