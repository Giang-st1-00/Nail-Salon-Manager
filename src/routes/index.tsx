import { DashBoard, Job, Product, Salary } from "../pages";
import config from "../config";

export const publicRoutes = [
  {
    path: config.routes.dashboard,
    component: DashBoard,
  },
  {
    path: config.routes.job,
    component: Job,
  },
  {
    path: config.routes.product,
    component: Product,
  },
  ,
  {
    path: config.routes.salary,
    component: Salary,
  },
];
