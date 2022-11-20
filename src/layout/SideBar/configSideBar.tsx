import { Link } from "react-router-dom";
import config from "../../config";

export const items = config.routes.map((route) => {
  return {
    key: route.key,
    icon: route.icon,
    label: route.path ? (
      <Link to={route.path}>{route.label}</Link>
    ) : (
      route.label
    ),
  };
});
