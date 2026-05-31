import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarFilters from "../Sidebar/SidebarFilters";
import BrokerList from "../Sidebar/BrokerList";
import PropertyTabs from "./PropertyTabs";
import PropertyGrid from "./PropertyGrid";
import Pagination from "./Pagination";
import { useAppSeletor } from "../../../services/helper/reduxstore";
import type { PropertyFilters } from "../../../type/interface/property/property.interface";

const PropertySection = () => {
  const { items } = useAppSeletor((state) => state.property);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const urlCategory = searchParams.get("category") || "All";


  const [filters, setFilters] = useState<PropertyFilters>({
    country: "All",
    city: "All",
    category: urlCategory,
    bhk: [],
    apartment: [],
    maxSqft: 0,
    maxPrice: 0
  });

 
  const activeFilters = useMemo(() => {
    return {
      ...filters,
      category: searchParams.get("category") || filters.category
    };
  }, [filters, searchParams]);


  const handleFilterChange = (
    newFilters: PropertyFilters | ((prev: PropertyFilters) => PropertyFilters)
  ) => {

    const nextFilters = typeof newFilters === "function" ? newFilters(filters) : newFilters;
    
    setFilters(nextFilters);
    setCurrentPage(1); 

    
    if (nextFilters.category !== urlCategory) {
      const newParams = new URLSearchParams(searchParams);
      if (nextFilters.category === "All") {
        newParams.delete("category");
      } else {
        newParams.set("category", nextFilters.category);
      }
      setSearchParams(newParams);
    }
  };

  const safeCurrentPage = currentPage > totalPages ? Math.max(1, totalPages) : currentPage;


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
            <SidebarFilters 
              filters={activeFilters} 
              setFilters={handleFilterChange} 
              ranges={derivedRanges} 
            />
            <BrokerList />
          </aside>
          <div className="flex-1 w-full">
            <PropertyTabs />
            <PropertyGrid
              filters={activeFilters}
              currentPage={safeCurrentPage}
              pageSize={6}
              onTotalPagesChange={setTotalPages}
            />
            <Pagination
              currentPage={safeCurrentPage}
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