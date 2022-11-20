import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import classNames from "classnames/bind";
import BreadCrumb from "../../components/BreadCrumb";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import style from "./index.module.scss";
const cx = classNames.bind(style);
const { Content } = Layout;

function DefaultLayout() {
  return (
    <div>
      <Layout>
        <SideBar />
        <Layout>
          <Header />
          <div className={cx("container")}>
            <Content className={cx("wrap-content")}>
              <BreadCrumb></BreadCrumb>
              <div className={cx("content")}>
                <Outlet />
              </div>
            </Content>
            <Footer />
          </div>
        </Layout>
      </Layout>
    </div>
  );
}

export default DefaultLayout;
