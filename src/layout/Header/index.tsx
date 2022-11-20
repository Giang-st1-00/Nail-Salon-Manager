import classNames from "classnames/bind";
import style from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { toggleCollapsed } from "../../redux/slices/activeUser";
import { collapsedSelector } from "../../redux/selector/activeUser";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);
function Header() {
  const dispatch = useDispatch();
  const collapsed = useSelector(collapsedSelector);
  const handleToggleCollapsed = () => {
    dispatch(toggleCollapsed(!collapsed));
  };
  return (
    <div
      className={cx("wrapper", {
        collapsed,
      })}
    >
      <button className={cx("btn-collapse")} onClick={handleToggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
    </div>
  );
}

export default Header;
