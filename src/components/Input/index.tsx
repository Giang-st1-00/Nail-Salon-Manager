import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
const { Search } = Input;
type TInputProps = {
  placeholder?: string;
  allowClear?: boolean;
  suffix?: React.ReactNode;
  search?: boolean;
  className?: any;
} & InputProps;

function CommonInput({
  placeholder,
  allowClear,
  suffix,
  search,
  className,
  ...props
}: TInputProps) {
  const Component = search ? Search : Input;
  const classes = cx("wrapper", {
    [className]: className,
  });
  return (
    <Component
      className={classes}
      placeholder={placeholder}
      allowClear={allowClear}
      suffix={suffix}
      {...props}
    />
  );
}

export default CommonInput;
