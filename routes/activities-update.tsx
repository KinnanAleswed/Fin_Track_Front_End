import React from "react";
import { Route } from "react-router-dom";
import ProgressUpdate from "../pages/activity-updates/progress-update";
import Expenses from "../pages/activity-updates/expenses";
import AddNewExpense from "../pages/activity-updates/add-new-expense";

const ActivitiesUpdateRoutes = [
  <Route
    path='/activities'
    element={<ProgressUpdate />}
    key='progress-update'
  />,
  <Route path='/activities/expenses' element={<Expenses />} key='expenses' />,
  <Route
    path='/activities/add-new-expense'
    element={<AddNewExpense />}
    key='add-new-expense'
  />,
];

export default ActivitiesUpdateRoutes;
