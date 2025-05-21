import React from "react";
import SideNavbarTravel from "../../components/layouts/side-navbar-travel";
const costDistributionRequest = () => {
  return (
    <div className='flex gap-8'>
      <SideNavbarTravel />
      <div className='flex-1'>
        <h1>Cost Distribution Request</h1>
      </div>
    </div>
  );
};

export default costDistributionRequest;
