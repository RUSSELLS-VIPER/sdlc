import { Pencil, Trash2 } from "lucide-react";

interface Customer {
  id: string;
  image: string;
  customerName: string;
  propertyType: string;
  email: string;
  phone: string;
  status: string;
  budget: string;
  registrationDate: string;
}

interface CustomerTableProps {
  customers: Customer[];
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Lost":
      return "bg-red-100 text-red-700";

    case "Negotiation":
      return "bg-purple-100 text-purple-700";

    case "Site visit":
      return "bg-yellow-100 text-yellow-700";

    case "Inquiry":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

const CustomerTable1 = ({
  customers,
}: CustomerTableProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#161E54]">
          Customer List
        </p>

        <button className="text-xs font-medium px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
          View all
        </button>
      </div>

      <div className="rounded-xl overflow-hidden overflow-x-auto border border-slate-100">
        <table
          className="w-full text-xs min-w-[900px]"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className="bg-[#161E54] text-white">
              <th className="text-left px-4 py-3 font-medium text-[11px]">
                ID
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Customer Name
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Property Type
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Email
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Phone
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Status
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Budget
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Registration date
              </th>

              <th className="text-left px-4 py-3 font-medium text-[11px]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-slate-100 hover:bg-slate-50/80 transition"
              >
                <td className="px-4 py-3 font-medium text-[#161E54]">
                  {customer.id}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={customer.image}
                      alt={customer.customerName}
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />

                    <span className="text-[#161E54] font-medium">
                      {customer.customerName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {customer.propertyType}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {customer.email}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {customer.phone}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] font-semibold px-3 py-1 rounded-full ${getStatusStyle(
                      customer.status
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-[#161E54] font-medium">
                  {customer.budget}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {customer.registrationDate}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2.5">
                    <button className="text-green-500 hover:text-green-600 transition">
                      <Pencil size={15} />
                    </button>

                    <button className="text-red-400 hover:text-red-500 transition">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <p className="text-xs text-slate-400 text-center sm:text-left">
          Showing 1-{customers.length} out of 16 result
        </p>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          <button className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            Prev.
          </button>

          <button className="text-xs w-7 h-7 rounded-lg bg-[#161E54] text-white font-medium">
            1
          </button>

          <button className="text-xs w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            2
          </button>

          <button className="text-xs w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            3
          </button>

          <button className="text-xs w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            4
          </button>

          <button className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable1;