import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
function Footer() {
  return <h1 className={cx("wrapper")}>This is footer</h1>;
}

export default Footer;
