interface RegionData {
  region: string;
  count: number;
  percentage: number;
}

interface CustomerRegionProps {
  regions: RegionData[];
}

const CustomerRegion = ({
  regions,
}: CustomerRegionProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm mb-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-[#161E54]">
          Customer BY Region
        </p>

        <select className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 outline-none text-slate-600 bg-white cursor-pointer">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Region List */}
        <div className="flex flex-col gap-4">
          {regions.map((item) => (
            <div key={item.region}>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-medium text-[#161E54]">
                  {item.region}
                </span>

                <span className="text-xs text-slate-400">
                  ({item.count})
                </span>
              </div>

              <div className="w-full h-2 bg-green-100 rounded-full">
                <div
                  className="h-[7px] rounded-full bg-green-500"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden h-[200px] border border-slate-100 shadow-inner">
          <iframe
            width="100%"
            height="200"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d921768!2d88.3!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerRegion;