<<<<<<< HEAD
import { Button as AntdButton } from "antd";
type TButtonProps = {
  primary?: boolean;
  outline?: boolean;
  width?: string;
  height?: string;
  color?: string;
  icon?: JSX.Element;
  children?: string;
  disabled?: boolean;
};
function Button({
  primary,
  outline,
  width,
  height,
  color,
  children,
}: TButtonProps) {
  return <AntdButton>{children}</AntdButton>;
=======
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
>>>>>>> 20c15099abda7b36e6c2e98ebb489e368c26c7cc
}

export default CommonButton;
