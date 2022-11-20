import config from "../config";

export const publicRoutes = config.routes.map((route) => ({
  key: route.key,
  path: route.path,
  component: route.Component,
}));
