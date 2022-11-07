import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const cx = classNames.bind(style);
const { Sider } = Layout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

function SideBar() {
  return (
    // dark light
    <Sider width={256} theme={"light"}>
      <div className={cx("wrapper")}>
        <div className={cx("logo")}>logo</div>
        <Menu
          className={cx("menu")}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
        <div className={cx("switch-theme")}>Switch theme</div>
      </div>
    </Sider>
  );
}

export default SideBar;
