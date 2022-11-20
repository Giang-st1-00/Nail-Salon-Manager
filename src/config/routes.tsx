import { DashBoard, Job, Product, Salary, User } from "../pages";
import {
  DashboardOutlined,
  UserOutlined,
  ToolOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
const config = [
  {
    key: 1,
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/",
    Component: DashBoard,
  },
  {
    key: 2,
    icon: <UserOutlined />,
    label: "User",
    path: "/user",
    Component: User,
  },
  {
    key: 3,
    icon: <ToolOutlined />,
    label: "Job",
    path: "/job",
    Component: Job,
  },
  {
    key: 4,
    icon: <DollarCircleOutlined />,
    label: "Salary",
    path: "/salary",
    Component: Salary,
  },
  {
    key: 5,
    icon: <ShoppingOutlined />,
    label: "Product",
    path: "/product",
    Component: Product,
  },
];
export default config;
