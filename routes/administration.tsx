import React from "react";
import { Route } from "react-router-dom";
import AddNewLocation from "../pages/adminstration/add-new-location";
import AddNewNotification from "../pages/adminstration/add-new-notification";
import LookupList from "../pages/adminstration/lookup-list";
import LocationList from "../pages/adminstration/location-list";
import AddNewLookup from "../pages/adminstration/add-new-lookup";
import NotificationList from "../pages/adminstration/notification-list";
 
const AdministrationRoutes = [
  <Route path='/administration' element={<LocationList />} key='location-list' />,
  <Route path='/administration/add-new-notification' element={<AddNewNotification />} key='add-new-notification' />,
  <Route path='/administration/lookup-list' element={<LookupList />} key='lookup-list' />,
  <Route path='/administration/location-list' element={<LocationList />} key='location-list' />,
  <Route path='/administration/add-new-lookup' element={<AddNewLookup />} key='add-new-lookup' />,
  <Route path='/administration/notification-list' element={<NotificationList />} key='notification-list' />,
];
 
export default AdministrationRoutes;