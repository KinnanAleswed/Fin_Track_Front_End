import React from "react";
import SideNavbarAdmin from "../../components/layouts/side-navbar-admin";

const LookupList = () => {
  return (
    <div className='flex gap-8'>
      <SideNavbarAdmin />
      <div className='flex-1'>
        <h1>Lookup List</h1>
      </div>
    </div>
  );
};

export default LookupList;
