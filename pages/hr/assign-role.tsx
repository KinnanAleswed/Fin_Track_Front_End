import React from "react";
import SideNavbarTravel from "../../components/layouts/side-navbar-travel";
const assignRole = () => {
  return (
    <div className='flex gap-8'>
      <SideNavbarTravel />
      <div className='flex-1'>
        <h1>Assign role</h1>
      </div>
    </div>
  );
};

export default assignRole;
