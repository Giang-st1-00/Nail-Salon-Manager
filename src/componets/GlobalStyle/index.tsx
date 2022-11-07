import "./index.less";
type TGlobalStyleProps = {
  children: JSX.Element;
};
const GlobalStyle = ({ children }: TGlobalStyleProps) => {
  return <>{children}</>;
};

export default GlobalStyle;
