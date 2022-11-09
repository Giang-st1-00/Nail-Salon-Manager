import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import classNames from "classnames/bind";
import BreadCrumb from "../../components/BreadCrumb";
import style from "./index.module.scss";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

const cx = classNames.bind(style);
const { Content } = Layout;

function DefaultLayout() {
  return (
    <div>
      <Layout>
        <SideBar />
        <Layout>
          <Header />
          <div className={cx("wrap-content")}>
            <Content className={cx("content")}>
              <BreadCrumb></BreadCrumb>
              <Outlet />
            </Content>
            <Footer />
          </div>
        </Layout>
      </Layout>
    </div>
  );
}

export default DefaultLayout;
