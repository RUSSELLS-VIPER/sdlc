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

const RangeSlider = ({ filters, setFilters, ranges }: Props) => {
  const maxSqft = ranges.maxSqft || 0;
  const minSqft = ranges.minSqft || 0;
  const maxPrice = ranges.maxPrice || 0;
  const minPrice = ranges.minPrice || 0;

  const selectedSqft = filters.maxSqft || maxSqft;
  const selectedPrice = filters.maxPrice || maxPrice;

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#171E2E] mb-2">Square feet</label>

        <div className="border border-yellow-400 rounded-xl px-4 py-4 bg-white">
          <input
            type="range"
            min={minSqft}
            max={maxSqft || minSqft}
            value={selectedSqft}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxSqft: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-xs font-semibold text-gray-600 mt-2 relative">
            <span>{minSqft}</span>
            <span className="absolute left-1/2 -translate-x-1/2 text-[#171E2E] font-bold">{selectedSqft} Sq.Ft</span>
            <span>{maxSqft} Sq.Ft</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-[#171E2E] mb-2">Price</label>

        <div className="border border-yellow-400 rounded-xl px-4 py-4 bg-white">
          <input
            type="range"
            min={minPrice}
            max={maxPrice || minPrice}
            value={selectedPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-xs font-semibold text-gray-600 mt-2 relative">
            <span>{minPrice.toLocaleString("en-IN")}</span>
            <span className="absolute left-1/2 -translate-x-1/2 text-[#171E2E] font-bold">
              {selectedPrice.toLocaleString("en-IN")}
            </span>
            <span>{maxPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
