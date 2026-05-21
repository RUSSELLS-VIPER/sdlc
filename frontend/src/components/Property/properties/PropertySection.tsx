import { useEffect, useMemo, useState } from "react";
import SidebarFilters from "../Sidebar/SidebarFilters";
import BrokerList from "../Sidebar/BrokerList";
import PropertyTabs from "./PropertyTabs";
import PropertyGrid from "./PropertyGrid";
import Pagination from "./Pagination";
import { useAppSeletor } from "../../../services/helper/reduxstore";

export type PropertyFilters = {
  country: string;
  city: string;
  category: string;
  bhk: string[];
  apartment: string[];
  maxSqft: number;
  maxPrice: number;
};

const PropertySection = () => {
  const { items } = useAppSeletor((state) => state.property);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<PropertyFilters>({
    country: "All",
    city: "All",
    category: "All",
    bhk: [],
    apartment: [],
    maxSqft: 0,
    maxPrice: 0
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  const derivedRanges = useMemo(() => {
    const prices = items.map((item) => Number(item.price) || 0).filter((value) => value > 0);
    const sqfts = items
      .map((item) => Number(String(item.sqft ?? "").replace(/[^\d.]/g, "")))
      .filter((value) => Number.isFinite(value) && value > 0);

    return {
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      minSqft: sqfts.length ? Math.min(...sqfts) : 0,
      maxSqft: sqfts.length ? Math.max(...sqfts) : 0
    };
  }, [items]);

  return (
    <div>
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6">
            <SidebarFilters filters={filters} setFilters={setFilters} ranges={derivedRanges} />
            <BrokerList />
          </aside>
          <div className="flex-1 w-full">
            <PropertyTabs />
            <PropertyGrid
              filters={filters}
              currentPage={currentPage}
              pageSize={6}
              onTotalPagesChange={setTotalPages}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySection;
