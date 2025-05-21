import HomeRoutes from "./home";
import AdministrationRoutes from "./administration";
import TravelAndExpenseRoutes from "./travel-and-expense-management";
import ActivitiesUpdateRoutes from "./activities-update";
import ProjectsAndBudgetRoutes from "./project-and-budget";

const AppRoutes = [
  ...HomeRoutes,
  ...AdministrationRoutes,
  ...TravelAndExpenseRoutes,
  ...ActivitiesUpdateRoutes,
  ...ProjectsAndBudgetRoutes,
];

export default AppRoutes;
