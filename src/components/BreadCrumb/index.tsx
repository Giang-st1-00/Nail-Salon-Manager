import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import { DashboardOutlined } from "@ant-design/icons";
import config from "../../config";
import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
function BreadCrumb() {
  const { pathname } = useLocation();
  const arrPathNames = pathname.split("/").filter((item) => item);
  const handleCapitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div className={cx("wrapper")}>
      <Breadcrumb className={cx("breadcrumb")}>
        {arrPathNames.length > 0 ? (
          <Breadcrumb.Item>
            <DashboardOutlined />
            <Link to={"/"}>Home</Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>
            <DashboardOutlined />
            <span>Home</span>
          </Breadcrumb.Item>
        )}
        {arrPathNames.map((name, index) => {
          const routeTo = `/${arrPathNames.slice(0, index + 1).join("/")}`;
          const indexCurrentRoute = config.routes.findIndex(
            (route) => route.path === routeTo
          );
          const icon = config.routes[indexCurrentRoute].icon;
          const isLate = index === arrPathNames.length - 1;
          return isLate ? (
            <Breadcrumb.Item key={index}>
              {icon}
              <span>{handleCapitalize(name)}</span>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              {icon}
              <Link to={routeTo}>{handleCapitalize(name)}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
