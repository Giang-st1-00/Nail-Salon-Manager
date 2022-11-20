import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
type TInputProps = {
  placeholder?: string;
  allowClear?: boolean;
  suffix?: React.ReactNode;
  onSearch?: () => void;
  className?: any;
} & InputProps;

function CommonInput({
  placeholder,
  allowClear,
  suffix,
  onSearch,
  className,
  ...props
}: TInputProps) {
  const classes = cx("wrapper", {
    [className]: className,
  });
  return (
    <Input
      className={classes}
      placeholder={placeholder}
      allowClear={allowClear}
      suffix={suffix}
      {...props}
    />
  );
}

export default CommonInput;
