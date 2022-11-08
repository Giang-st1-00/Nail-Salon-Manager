import { Input as AntdInput, Space } from "antd";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
const { Search } = AntdInput;
type PInputProps = {
  placeholder?: string;
  allowClear?: boolean;
  suffix?: React.ReactNode;
  search?:boolean
};

function Input({ placeholder, allowClear, suffix,search }: PInputProps) {
  const Component = search ? Search : AntdInput;
  return (
    <Component
      className={cx("input")}
      placeholder={placeholder}
      allowClear={allowClear}
      suffix={suffix}
    />
  );
}

export default Input;
