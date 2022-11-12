import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
function Footer() {
  return (
    <footer className={cx("wrapper")}>Ant Design Admin ©2020 zuiidea</footer>
  );
}

export default Footer;
