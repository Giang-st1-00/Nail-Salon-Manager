import { Layout, Menu, Switch } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import images from "../../assets/images";
import { BulbOutlined } from "@ant-design/icons";
import { items } from "./configSideBar";
import config from "../../config";
import { changeDarkMode, toggleCollapsed } from "../../redux/slices/activeUser";
import {
  darkModeSelector,
  collapsedSelector,
} from "../../redux/selectors/activeUser";
import style from "./index.module.scss";

const cx = classNames.bind(style);
const { Sider } = Layout;

function SideBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const darkMode = useSelector(darkModeSelector);
  const collapsed = useSelector(collapsedSelector);
  let indexCurrentRoute =
    config.routes.findIndex((route) => route.path === pathname) + 1;
  const handleToggleDarkMode = (checked: boolean) => {
    checked
      ? dispatch(changeDarkMode("dark"))
      : dispatch(changeDarkMode("light"));
  };
  return (
    <Sider
      width={256}
      theme={darkMode}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className={cx("wrapper")}>
        <div className={cx("brand")}>
          <img src={images.logo} alt="" className={cx("logo")} />
          {!collapsed && <h1 className={cx("title")}>ANTD ADMIN</h1>}
        </div>
        <Menu
          className={cx("menu")}
          theme={darkMode}
          mode="inline"
          defaultSelectedKeys={[indexCurrentRoute.toString()]}
          items={items}
        />
        <div className={cx("switch-theme")}>
          <span>
            <BulbOutlined className={cx("icon-bulb")} />
            Switch Theme
          </span>
          <Switch
            checkedChildren="Dark"
            unCheckedChildren="Light"
            onChange={handleToggleDarkMode}
          />
        </div>
      </div>
    </Sider>
  );
}

export default SideBar;
