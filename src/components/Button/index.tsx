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
}

export default Button;
