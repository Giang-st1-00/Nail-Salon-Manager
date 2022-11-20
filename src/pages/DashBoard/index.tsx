import { Row, Col, Card } from "antd";
import {
  TeamOutlined,
  PushpinOutlined,
  ShoppingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
function DashBoard() {
<<<<<<< HEAD
  return <div style={{ height: "1000px" }}></div>;
=======
  return (
    <Row gutter={24} className={cx("wrapper")}>
      {/* map data */}
      <Col span={6}>
        <Card className={cx("card")}>
          <div className={cx("card-body")}>
            <TeamOutlined className={cx("icon")} style={{ color: "#64EA91" }} />
            <div className={cx("content")}>
              <h3 className={cx("title")}>User</h3>
              <span className={cx("number")}>781</span>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className={cx("card")}>
          <div className={cx("card-body")}>
            <PushpinOutlined
              className={cx("icon")}
              style={{ color: "#8FC9FB" }}
            />
            <div className={cx("content")}>
              <h3 className={cx("title")}>Job</h3>
              <span className={cx("number")}>2,781</span>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className={cx("card")}>
          <div className={cx("card-body")}>
            <MessageOutlined
              className={cx("icon")}
              style={{ color: "#D883EB" }}
            />
            <div className={cx("content")}>
              <h3 className={cx("title")}>Online Review</h3>
              <span className={cx("number")}>22</span>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className={cx("card")}>
          <div className={cx("card-body")}>
            <ShoppingOutlined
              className={cx("icon")}
              style={{ color: "#F69899" }}
            />
            <div className={cx("content")}>
              <h3 className={cx("title")}>Product</h3>
              <span className={cx("number")}>81</span>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
>>>>>>> 20c15099abda7b36e6c2e98ebb489e368c26c7cc
}

export default DashBoard;
