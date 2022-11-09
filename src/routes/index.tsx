import { DashBoard, Job, Product, Salary, User } from "../pages";
import config from "../config";

export const publicRoutes = [
  {
    path: config.routes.dashboard,
    component: DashBoard,
  },
  {
    path: config.routes.user,
    component: User,
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
