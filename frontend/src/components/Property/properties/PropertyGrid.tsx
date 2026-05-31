import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSeletor } from "../../../services/helper/reduxstore";
import { getProperties } from "../../../store/slices/property.slice";
import type { Property } from "../../../type/type/property/property";
import PropertyCard from "./PropertyCard";
import type { PropertyFilters } from "../../../type/interface/property/property.interface";


type Props = {
  filters: PropertyFilters;
  currentPage: number;
  pageSize: number;
  onTotalPagesChange: (value: number) => void;
  projectStatus?: "Completed" | "Ongoing";
};

const getCountryFromAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "Unknown";
};

const getCityFromAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts[0] : "Unknown";
};

const parseSqft = (sqft: string | undefined) => Number(String(sqft ?? "").replace(/[^\d.]/g, "")) || 0;
const normalizeCategory = (value: string) => value.trim().toLowerCase();
const normalizeProjectStatus = (value: string | undefined) => (value ?? "Completed").trim().toLowerCase();

const PropertyGrid = ({
  filters,
  currentPage,
  pageSize,
  onTotalPagesChange,
  projectStatus = "Completed",
}: Props) => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSeletor((state) => state.property);
  const normalizedProjectStatus = normalizeProjectStatus(projectStatus);

  useEffect(() => {
    dispatch(getProperties({ projectStatus }));
  }, [dispatch, projectStatus]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const projectStatus = normalizeProjectStatus(item.projectStatus);
      if (projectStatus !== normalizedProjectStatus) {
        return false;
      }

      const itemCountry = getCountryFromAddress(item.address || "");
      const itemCity = getCityFromAddress(item.address || "");
      const itemPropertyType = item.propertyType || "--";
      const itemApartmentType = item.apartmentType || "--";
      const itemCategory = itemPropertyType !== "--" ? itemPropertyType : itemApartmentType;
      const itemSqft = parseSqft(item.sqft);
      const itemPrice = Number(item.price) || 0;

      const countryMatch = filters.country === "All" || itemCountry === filters.country;
      const cityMatch = filters.city === "All" || itemCity === filters.city;
      const categoryMatch =
        filters.category === "All" ||
        normalizeCategory(itemCategory) === normalizeCategory(filters.category);
      const bhkMatch = !filters.bhk.length || filters.bhk.includes(item.bhk || "--");
      const apartmentMatch = !filters.apartment.length || filters.apartment.includes(itemApartmentType);
      const sqftMatch = !filters.maxSqft || itemSqft <= filters.maxSqft;
      const priceMatch = !filters.maxPrice || itemPrice <= filters.maxPrice;

      return countryMatch && cityMatch && categoryMatch && bhkMatch && apartmentMatch && sqftMatch && priceMatch;
    });
  }, [filters, items, normalizedProjectStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [onTotalPagesChange, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredItems.slice(start, end);
  }, [currentPage, filteredItems, pageSize]);

  const properties: Property[] = paginatedItems.map((item) => ({
    id: item._id,
    title: item.title,
    img: item.image ?? "https://placehold.co/600x400?text=Property",
    price: `Rs.${Number(item.price ?? 0).toLocaleString("en-IN")}`,
    location: item.address,
    status: item.status || "Available",
    sqft: item.sqft || "--",
    bhk: item.bhk || "--",
    apartmentType: item.apartmentType || "--",
    propertyType: item.propertyType || "--",
    likesCount: item.likesCount
  }));

  if (loading) {
    return <p className="mb-10">Loading properties...</p>;
  }

  if (error) {
    return <p className="mb-10 text-red-600">{error}</p>;
  }

  if (!filteredItems.length) {
    return <p className="mb-10">No properties found for selected filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {properties.map((data) => (
        <PropertyCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default PropertyGrid;
