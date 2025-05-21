import React from "react";
import { Route } from "react-router-dom";
import ListOfProject from "../pages/pmo/list-of-project";
import CreateNewProject from "../pages/pmo/create-new-project";

const ProjectsAndBudgetRoutes = [
  <Route path='/projects' element={<ListOfProject />} key='list-of-project' />,
  <Route
    path='/projects/create-new'
    element={<CreateNewProject />}
    key='create-new-project'
  />,
];

export default ProjectsAndBudgetRoutes;
