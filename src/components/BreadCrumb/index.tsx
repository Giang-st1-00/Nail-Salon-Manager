import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import {
  DashboardOutlined,
  ToolOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
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
          const isLate = index === arrPathNames.length - 1;
          return isLate ? (
            <Breadcrumb.Item>{handleCapitalize(name)}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              <Link to={routeTo}>{handleCapitalize(name)}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
