import { Button as AntdButton } from "antd";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
type TButtonProps = {
  children?: string;
  Icon?: React.ReactNode;
  type?:
    | "primary"
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "dashed"
    | undefined;
  size?: "large" | "middle" | "small";
  shape?: "default" | "circle" | "round";
};

function Button({
  children,
  Icon,
  type = "primary",
  size = "middle",
  shape = "default",
}: TButtonProps) {
  return (
    <div className={cx("wrapper")}>
      <AntdButton
        className={cx("btn")}
        shape={shape}
        size={size}
        icon={Icon}
        type={type}
      >
        {children}
      </AntdButton>
    </div>
  );
}

export default Button;
