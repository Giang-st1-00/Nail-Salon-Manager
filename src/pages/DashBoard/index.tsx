import { useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import {
  TeamOutlined,
  PushpinOutlined,
  ShoppingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import {
  interestRate,
  userSelector,
  productSelector,
  jobSelector,
} from "../../redux/selectors";
const cx = classNames.bind(style);
function DashBoard() {
  const counterUser = useSelector(userSelector);
  const counterJob = useSelector(jobSelector);
  const counterProduct = useSelector(productSelector);
  const profit = useSelector(interestRate);
  const configListCard = [
    {
      key: 1,
      icon: (
        <TeamOutlined className={cx("icon")} style={{ color: "#64EA91" }} />
      ),
      title: "User",
      data: counterUser.length,
    },
    {
      key: 2,
      icon: (
        <PushpinOutlined className={cx("icon")} style={{ color: "#8FC9FB" }} />
      ),
      title: "Job",
      data: counterJob.length,
    },
    {
      key: 3,
      icon: (
        <BarChartOutlined className={cx("icon")} style={{ color: "#D897EB" }} />
      ),
      title: "Profit",
      data: profit + "$",
    },
    {
      key: 4,
      icon: (
        <ShoppingOutlined className={cx("icon")} style={{ color: "#F69899" }} />
      ),
      title: "Product",
      data: counterProduct.length,
    },
  ];
  return (
    <Row gutter={24} className={cx("wrapper")}>
      {configListCard.map((item) => (
        <Col key={item.key} span={6}>
          <Card className={cx("card")}>
            <div className={cx("card-body")}>
              {item.icon}
              <div className={cx("content")}>
                <h3 className={cx("title")}>{item.title}</h3>
                <span className={cx("number")}>{item.data}</span>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashBoard;
