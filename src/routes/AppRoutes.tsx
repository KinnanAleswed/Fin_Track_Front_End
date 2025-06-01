import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/executive-management/dashboard";
import LocationList from "../pages/adminstration/location-list";
import TravelRequestApproval from "../pages/hr/travel-request-approval";
import CreateNewTravelRequest from "../pages/users/create-travel-request";
import ProgressUpdate from "../pages/activity-updates/activity-update";
import ListOfProject from "../pages/pmo/list-of-project";
import ExchangeRate from "../pages/finance/exchange-rate";
import CostDistributionRequest from "../pages/pm/cost-distribution-request";
import AssignRole from "../pages/hr/assign-role";
import BillingRate from "../pages/finance/billing-rate";
import NotificationList from "../pages/adminstration/notification-list";
import LookupList from "../pages/adminstration/lookup-list";
import CreateProjectForm from "../components/forms/createProjectForm";
import CreateBudgetItem from "../pages/pm/create-budget-item";
import AddNewExpense from "../../src/pages/activity-updates/add-new-expense";
import AddNewDetailedLookup from "../pages/adminstration/add-new-detailed-lookup";
import AddNewMasterLookup from "../pages/adminstration/add-new-master-lookup";
import AddNewNotification from "../pages/adminstration/add-new-notification";
import AddNewLocation from "../pages/adminstration/add-new-location";
import DetailedLookupList from "../pages/adminstration/detailed-lookup-list";
export const AppRoutes = () => (
  <Routes>
    <Route path='/Dashboard' element={<Dashboard />} />
    <Route path='/administration' element={<LocationList />} />
    <Route path="/administration/add-new-location" element={<AddNewLocation/>}/>
    <Route
      path='/travel and expense management'
      element={<TravelRequestApproval />}
    ></Route>
    <Route
      path='/travel and expense management/new-travel-request'
      element={<CreateNewTravelRequest />}
    />
    <Route path='/activities' element={<ProgressUpdate />} />
    <Route path='/projects List' element={<ListOfProject />} />
    <Route
      path='/projects List/create-new-project'
      element={<CreateProjectForm />}
    />
    <Route path='/activities/add-new-expense' element={<AddNewExpense />} />
    <Route path='/projects List/Budget Items' element={<CreateBudgetItem />} />
    {/*sidebar travel routes*/}
    <Route
      path='/travel and expense management/exchange-rate'
      element={<ExchangeRate />}
    />
    <Route
      path='/travel and expense management/cost-distribution-request'
      element={<CostDistributionRequest />}
    />
    <Route
      path='/travel and expense management/assign-role'
      element={<AssignRole />}
    />
    <Route
      path='/travel and expense management/billing-rate'
      element={<BillingRate />}
    />
    <Route
      path='/administration/lookup-list/add-new-detailed-lookup'
      element={<AddNewDetailedLookup />}
      />
      <Route path="/administration/detailed-lookup/:id"
       element={<AddNewDetailedLookup />} 
       />

    <Route
      path='/administration/lookup-list/add-new-master-lookup'
      element={<AddNewMasterLookup />}
    />
    <Route
    path='/administration/lookup-list/:masterLookupId'
    element={<DetailedLookupList />}
    />
    <Route 
    path="/administration/lookup-list/add-new-master-lookup/edit/:id" 
    element={<AddNewMasterLookup />} 
    />
    <Route
      path='/administration/notification-list/add-new-notification'
      element={<AddNewNotification />}
    />

    {/* SideBar administration routes */}
    <Route path='/administration/location-list' element={<LocationList />} />
    <Route
      path='/administration/notification-list'
      element={<NotificationList />}
    />
    <Route path='/administration/lookup-list' element={<LookupList />} />
    
  </Routes>
);

