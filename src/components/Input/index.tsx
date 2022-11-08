import { AudioOutlined } from "@ant-design/icons";
import { Input as AntdInput, Space } from "antd";
import { Component } from "react";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);

function Input(props : any) {
  return (
    <AntdInput 
      {...props} 
      className={cx("input")}
    />
      // className={cx("input")}
      // suffix={suffix}
      // allowClear
      // placeholder={placeholder}
      // style={{ width: 200 }}
  );
}

export default Input;
