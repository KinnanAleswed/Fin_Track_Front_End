import React from "react";
import { Route } from "react-router-dom";
import TravelRequestApproval from "../pages/hr/travel-request-approval";
import CreateTravelRequestPage from "../pages/users/create-travel-request";
import BillingRate from "../pages/finance/billing-rate";
import AssignRole from "../pages/hr/assign-role";
import ExchangeRate from "../pages/finance/exchange-rate";
import CostDistributionRequest from "../pages/pm/cost-distribution-request";

const TravelAndExpenseRoutes = [
  <Route
    path='/travel'
    element={<TravelRequestApproval />}
    key='travel-request-approval'
  />,
  <Route
    path='/travel/new'
    element={<CreateTravelRequestPage />}
    key='create-travel-request'
  />,
  <Route
    path='/finance/billing-rate'
    element={<BillingRate />}
    key='billing-rate'
  />,
  <Route path='/hr/assign-role' element={<AssignRole />} key='assign-role' />,
  <Route
    path='/finance/exchange-rate'
    element={<ExchangeRate />}
    key='exchange-rate'
  />,
  <Route
    path='/pm/cost-distribution-request'
    element={<CostDistributionRequest />}
    key='cost-distribution-request'
  />,
];

export default TravelAndExpenseRoutes;
