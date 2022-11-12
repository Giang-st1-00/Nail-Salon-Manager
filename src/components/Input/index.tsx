import { Input as AntdInput } from "antd";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
const { Search } = AntdInput;
type TInputProps = {
  placeholder?: string;
  allowClear?: boolean;
  suffix?: React.ReactNode;
  search?: boolean;
  className?: any;
};

function Input({
  placeholder,
  allowClear,
  suffix,
  search,
  className,
}: TInputProps) {
  const Component = search ? Search : AntdInput;
  const classes = cx("input", {
    [className]: className,
  });
  return (
    <Component
      className={classes}
      placeholder={placeholder}
      allowClear={allowClear}
      suffix={suffix}
    />
  );
}

export default Input;
