import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Briefcase, Activity, BarChart3 } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const NavBar: React.FC = () => {
  const navItems: NavItem[] = [
    {
      path: "/Dashboard",
      label: "Home",
      icon: <Home size={18} />,
    },
    {
      path: "/administration",
      label: "Administration",
      icon: <Users size={18} />,
    },
    {
      path: "/travel",
      label: "Travel and Expense Management",
      icon: <Briefcase size={18} />,
    },
    {
      path: "/activities",
      label: "Activities Update",
      icon: <Activity size={18} />,
    },
    {
      path: "/projects",
      label: "Projects and Budget",
      icon: <BarChart3 size={18} />,
    },
  ];

  return (
    <nav className='bg-[#28a5d6] from-cyan-500 to-blue-500 text-white py-2'>
      <div className='flex items-center px-2'>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-2 px-4 py-3 transition-colors rounded-t-lg
              ${isActive ? "bg-white/20" : "hover:bg-white/10"}
              ${
                isActive
                  ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
                  : ""
              }
            `}
          >
            {item.icon}
            <span className='text-lg font-medium'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
