import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Travel Request",
    to: "/travel-and-expense-management",
    key: "travel-request",
  },
  {
    label: "Exchange Rate",
    to: "/travel-and-expense-management/exchange-rate",
    key: "exchange-rate",
  },
  {
    label: "Cost Distribution Request",
    to: "/travel-and-expense-management/cost-distribution-request",
    key: "cost-distribution-request",
  },
  {
    label: "Resources Role",
    to: "/travel-and-expense-management/assign-role",
    key: "resources-role",
  },
  {
    label: "Billing Rates",
    to: "/travel-and-expense-management/billing-rate",
    key: "billing-rates",
  },
];

const SideNavbarTravel = () => {
  const location = useLocation();
  return (
    <div className='bg-white rounded-xl shadow-sm w-60 py-2 px-0 flex flex-col gap-0 min-h-[350px]'>
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            to={item.to}
            key={item.key}
            className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 cursor-pointer transition
              ${isActive ? "bg-[#eaf6fb]" : "hover:bg-gray-100"}
              ${
                isActive
                  ? "font-medium text-[#28a5d6]"
                  : "text-black font-normal"
              }
            `}
            style={{ textDecoration: "none" }}
          >
            <span>{item.label}</span>
            <ChevronRight
              size={18}
              className={isActive ? "text-[#28a5d6]" : "text-gray-400"}
            />
          </Link>
        );
      })}
    </div>
  );
};
export default SideNavbarTravel;
