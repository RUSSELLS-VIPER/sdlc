import React from 'react'
import { NavLink } from 'react-router-dom'

const BreadCrumb = () => {
  return (
    <section className="text-sm font-semibold text-gray-700 mb-8">
      
      <div
        aria-label="Breadcrumb"
          className="flex items-center justify-start lg:justify-center space-x-2"
        >
        <NavLink
          to="/"
          className="hover:text-gray-900 transition"
        >
          Home
        </NavLink>

        <i className="fa-solid fa-chevron-right text-[10px] text-gray-400"></i>

        <NavLink
          to="/property"
          className="hover:text-gray-900 transition"
        >
          Properties
        </NavLink>

        <i className="fa-solid fa-chevron-right text-[10px] text-gray-400"></i>

        <span className="text-gray-500">
          Detail
        </span>

      </div>
    </section>
  )
}

export default BreadCrumb