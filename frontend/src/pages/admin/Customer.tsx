import React from 'react'
import CustomerTable from '../../components/Dashboard/AdminDashboard/CustomerTable'
import { customers } from '../../services/json/customer.input'

const Customer = () => {
  return (
     <section className="mx-auto max-w-[1580px] px-4 md:px-[17px] mt-4">

      <h2 className="mb-2 text-xl font-bold text-ink">List view</h2>

      <section className="rounded-t-xl rounded-b-lg bg-white px-[17px] pb-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[15px] font-medium text-ink">Customer List</h3>
          <button
            className="h-7 rounded-xl border border-[#08092d] px-3 text-[12px] font-medium text-ink transition hover:bg-[#08092d] hover:text-white cursor-pointer">View
            all</button>
        </div>
         <section className="rounded-[14px] bg-white p-5">
      <CustomerTable customers={customers} />
    </section>
     <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#232323]">
          <p className="rounded border border-[#d0d0d0] px-2 py-1.5 text-[12px]">Showing 1-4 out of 16 result</p>
          <div className="flex items-center gap-2">
            <button
              className="rounded border border-dashed border-[#777] px-2.5 py-1.5 text-[11px] font-medium cursor-pointer">Prev.</button>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17205d] text-white text-[12px] cursor-pointer">1</button>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#8c8c8c] text-[#17205d] text-[12px] cursor-pointer">2</button>
            <button
              className="rounded border border-dashed border-[#777] px-2.5 py-1.5 text-[11px] font-medium cursor-pointer">Next</button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Customer