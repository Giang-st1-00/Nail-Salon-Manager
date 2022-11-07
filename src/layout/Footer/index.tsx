import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
function Footer() {
  return <footer className={cx("wrapper")}>This is footer</footer>;
}

export default Footer;
