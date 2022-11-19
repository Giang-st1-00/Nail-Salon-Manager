import classNames from "classnames/bind";
import style from "./index.module.scss";
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

const cx = classNames.bind(style);
function Header() {
  const dispatch = useDispatch();
  const collapsed = useSelector(collapsedSelector);
  const handleToggleCollapsed = () => {
    dispatch(toggleCollapsed(!collapsed));
  };
  const elementBellData = [
    {
      content: "New User is registered",
      time: "3 小时前",
    },
    {
      content: "Application has been approved.",
      time: "14 小时前",
    },
    {
      content: "New User is registered",
      time: "3 小时前",
    },
    {
      content: "Application has been approved.",
      time: "14 小时前",
    },
    {
      content: "New User is registered",
      time: "3 小时前",
    },
  ];

  const contentBell = (
    <div className={cx("contentBell")}>
      {elementBellData.map((element, index) => {
        const items: MenuProps["items"] = [
          {
            label: `${element.content}`,
            key: `${index}`,
          },
        ];
        return (
          <div className={cx("element")} key={index}>
            <div>
              <Dropdown menu={{ items }} placement="top" arrow>
                <h4>{element.content}</h4>
              </Dropdown>
              <p>{element.time}</p>
            </div>
            <div className={cx("arrow")}>
              <RightOutlined />
            </div>
          </div>
        );
      })}

      <div>
        <p className={cx("done")}>Clear notifications</p>
      </div>
    </div>
  );
  return (
    <div
      className={cx("wrapper", {
        collapsed,
      })}
    >
      <div className={cx("menuFoldOutlined")} onClick={handleToggleCollapsed}>
        <MenuFoldOutlined className={cx("menuIcon")} />
      </div>
      <div className={cx("rightContainer")}>
        <Popover
          // className={cx("bellOutlined")}
          trigger={"click"}
          placement="bottomLeft"
          content={contentBell}
          showArrow={false}
        >
          <Button>
            <Badge dot>
              <Avatar
                className={cx("avatar")}
                shape="square"
                icon={<BellOutlined />}
              />
            </Badge>
          </Button>
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
        <Menu className={cx("menu-overflow")} mode="horizontal">
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
      </div>
    </div>
  );
}

export default Header;
