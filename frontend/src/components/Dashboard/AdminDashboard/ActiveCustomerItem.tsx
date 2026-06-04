import { MapPin } from "lucide-react";

interface ActiveCustomerItemProps {
  image: string;
  name: string;
  location: string;
}

const ActiveCustomerItem = ({
  image,
  name,
  location,
}: ActiveCustomerItemProps) => {
  return (
    <div className="flex items-center gap-3 bg-[#eef4fb] rounded-xl px-4 py-3.5">
      <img
        src={image}
        alt={name}
        className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
      />

      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#161E54] truncate">
          {name}
        </p>

        <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5 truncate">
          <MapPin
            size={10}
            className="text-[#94a3b8] flex-shrink-0"
          />
          {location}
        </p>
      </div>
    </div>
  );
};

export default ActiveCustomerItem;