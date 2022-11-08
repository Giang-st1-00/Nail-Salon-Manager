import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
function Header() {
  return <header className={cx("wrapper")}></header>;
}

export default Header;
