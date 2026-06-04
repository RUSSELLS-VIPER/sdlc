import { getStatusColor, type Customer } from "../../../type/interface/AdminDashboard/AdminDashboard.interface";

import { Pencil, Trash2 } from "lucide-react";

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <table className="w-full min-w-[1010px] border-collapse text-left text-[12px]">
        <thead>
          <tr className="h-[33px] bg-[#010126] text-white">
            <th className="rounded-l-xl px-7 font-medium">ID</th>
            <th className="px-4 font-medium">Customer Name</th>
            <th className="px-4 font-medium">Property Type</th>
            <th className="px-4 font-medium">Email</th>
            <th className="px-4 font-medium">Phone</th>
            <th className="px-4 font-medium">Status</th>
            <th className="px-4 font-medium">Budget</th>
            <th className="px-4 font-medium">Registration Date</th>
            <th className="rounded-r-xl px-4 font-medium">Action</th>
          </tr>
        </thead>

        <tbody className="text-[#252525]">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="h-[50px] border-b border-gray-100"
            >
              <td className="px-7">{customer.id}</td>

              <td className="px-4">
                <div className="flex items-center gap-4">
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="h-[22px] w-[22px] rounded object-cover"
                  />
                  {customer.name}
                </div>
              </td>

              <td className="px-4">{customer.propertyType}</td>

              <td className="px-4">{customer.email}</td>

              <td className="px-4">{customer.phone}</td>

              <td className="px-4">
                <span
                  className={`inline-flex min-w-[85px] justify-center rounded-lg px-3 py-1.5 text-[11px] font-medium text-black ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </td>

              <td className="px-4">{customer.budget}</td>

              <td className="px-4">{customer.registrationDate}</td>

              <td className="px-4">
                <div className="flex gap-3">
                  <button className="cursor-pointer text-[#70c74f]">
                    <Pencil size={15} />
                  </button>

                  <button className="cursor-pointer text-[#ff5a4e]">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;