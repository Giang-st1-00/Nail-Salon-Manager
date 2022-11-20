import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import { toggleCollapsed } from "../../redux/slices/activeUser";
import { collapsedSelector } from "../../redux/selector/activeUser";
import {
  Avatar,
  Badge,
  Dropdown,
  Menu,
  MenuProps,
  Popover,
  Button,
} from "antd";
import {
  RightOutlined,
  MenuFoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import style from "./index.module.scss";

const cx = classNames.bind(style);
function Header() {
  const dispatch = useDispatch();
  const collapsed = useSelector(collapsedSelector);
  const handleToggleCollapsed = () => {
    dispatch(toggleCollapsed(!collapsed));
  };
  // const dataNotification = [
  //   {
  //     content: "New User is registered",
  //     time: "3 小时前",
  //   },
  //   {
  //     content: "Application has been approved.",
  //     time: "14 小时前",
  //   },
  //   {
  //     content: "New User is registered",
  //     time: "3 小时前",
  //   },
  //   {
  //     content: "Application has been approved.",
  //     time: "14 小时前",
  //   },
  //   {
  //     content: "New User is registered",
  //     time: "3 小时前",
  //   },
  // ];

  // const notification = (
  //   <div className={cx("notification-list")}>
  //     {dataNotification.map((item, index) => {
  //       const items: MenuProps["items"] = [
  //         {
  //           key: index,
  //           label: item.content,
  //         },
  //       ];
  //       return (
  //         <div className={cx("notification-item")}>
  //           <div>
  //             <Dropdown menu={{ items }} placement="top" arrow>
  //               <h4>{item.content}</h4>
  //             </Dropdown>
  //             <p>{item.time}</p>
  //           </div>
  //             <RightOutlined />
  //         </div>
  //       );
  //     })}
  //     <div>
  //       <p className={cx("clear-notificaiton")}>Clear notifications</p>
  //     </div>
  //   </div>
  // );
  return (
    <div
      className={cx("wrapper", {
        collapsed,
      })}
    >
      <div className={cx("menuFoldOutlined")} onClick={handleToggleCollapsed}>
        <MenuFoldOutlined className={cx("menuIcon")} />
      </div>
      {/* <div className={cx("action")}>
        <Popover
          className={cx("bellOutlined")}
          trigger={"click"}
          placement="bottomLeft"
          content={notification}
          showArrow={false}
        >
              <span>
                <Badge dot>
                  <Avatar
                  className={cx("notification")}
                    shape="square"
                    icon={<BellOutlined />}
                  />
                </Badge>
              </span>
          
        </Popover>

        <Menu className={cx("languages")} mode="horizontal">
          <Menu.SubMenu
            className={cx("subMenu")}
            title={
              <img
                width={24}
                src="https://antd-admin.zuiidea.com/america.svg"
              />
            }
          >
            <Menu.Item className={cx("menuItem")}>
              <img
                width={24}
                src="https://antd-admin.zuiidea.com/portugal.svg"
              />
              Português
            </Menu.Item>
            <Menu.Item className={cx("menuItem")}>
              <img
                width={24}
                src="https://antd-admin.zuiidea.com/america.svg"
              />
              English
            </Menu.Item>
            <Menu.Item className={cx("menuItem")}>
              <img width={24} src="https://antd-admin.zuiidea.com/china.svg" />
              中文
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>

        <Menu className={cx("account")} mode="horizontal">
          <Menu.SubMenu
            title={
              <>
                Hi, guest
                <Avatar className={cx("avatar")} size={32} />
              </>
            }
          >
            <Menu.Item>Sign out</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div> */}
    </div>
  );
}

export default Header;
