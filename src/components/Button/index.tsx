import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
type TCommonButtonProps = {
  children?: string | React.ReactNode;
  icon?: React.ReactNode;
  type?: "primary" | "link" | "text" | "ghost" | "default" | "dashed";
  size?: "large" | "middle" | "small";
  htmlType?: "button" | "submit" | "reset";
  shape?: "default" | "circle" | "round";
  disabled?: boolean;
  border?: boolean;
  loading?: boolean;
  ghost?: boolean;
  className?: any;
  onClick?: () => void;
} & ButtonProps;

function CommonButton({
  children,
  icon,
  type,
  size = "middle",
  shape = "default",
  className,
  htmlType,
  border = true,
  onClick,
  ...props
}: TCommonButtonProps) {
  const classes = cx("btn", {
    "no-border": !border,
    [className]: className,
  });
  return (
    <Button
      shape={shape}
      size={size}
      className={classes}
      icon={icon}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CommonButton;
