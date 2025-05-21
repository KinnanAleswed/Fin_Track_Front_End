import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../pages/executive-management/dashboard";

const HomeRoutes = [
  <Route path='/Dashboard' element={<Dashboard />} key='dashboard' />,
];

export default HomeRoutes;
