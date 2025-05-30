import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      className='flex items-center text-sm text-gray-500'
      aria-label='Breadcrumb'
    >
      <ol className='inline-flex items-center space-x-1'>
        <li>
          <Link to='/Dashboard' className='hover:text-[#28a5d6] font-medium'>
            Home
          </Link>
        </li>
        {pathnames.map((value, idx) => {
          const to = `/${pathnames.slice(0, idx + 1).join("/")}`;
          const isLast = idx === pathnames.length - 1;
          return (
            <React.Fragment key={to}>
              <span className='mx-1 text-gray-400'>
                <ChevronRight size={16} />
              </span>
              {isLast ? (
                <span className='font-semibold text-black capitalize'>
                  {decodeURIComponent(value.replace(/-/g, " "))}
                </span>
              ) : (
                <Link to={to} className='hover:text-[#28a5d6] capitalize'>
                  {decodeURIComponent(value.replace(/-/g, " "))}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
