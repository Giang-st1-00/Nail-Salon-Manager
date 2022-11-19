import { Layout, Menu, Switch } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import images from "../../assets/images";
import { BulbOutlined } from "@ant-design/icons";
import sideBarList from "./configSideBar";
const cx = classNames.bind(style);
const { Sider } = Layout;

function SideBar() {
  return (
    // dark light
    <Sider width={256} theme="light" trigger={null}>
      <div className={cx("wrapper")}>
        <div className={cx("brand")}>
          <img src={images.logo} alt="" className={cx("logo")} />
          <h1 className={cx("title")}>ANTD ADMIN</h1>
        </div>
        <Menu
          className={cx("menu")}
          theme="light"
          mode="inline"
          // defaultSelectedKeys={["1"]}
        >
          {sideBarList.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className={cx("switch-theme")}>
          <span>
            <BulbOutlined className={cx("icon-bulb")} />
            Switch Theme
          </span>
          <Switch
            checkedChildren="Dark"
            unCheckedChildren="Light"
            defaultChecked
          />
        </div>
      </div>
    </Sider>
  );
}

export default SideBar;
