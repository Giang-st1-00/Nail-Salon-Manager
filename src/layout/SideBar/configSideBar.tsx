import {
  DashboardOutlined,
  UserOutlined,
  ToolOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
const items = [
  {
    key: 1,
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/",
  },
  {
    key: 2,
    icon: <UserOutlined />,
    label: "User",
    path: "user",
  },
  {
    key: 3,
    icon: <ToolOutlined />,
    label: "Job",
    path: "job",
  },
  {
    key: 4,
    icon: <DollarCircleOutlined />,
    label: "Salary",
    path: "salary",
  },
  {
    key: 5,
    icon: <ShoppingOutlined />,
    label: "Product",
    path: "product",
  },
];
export default items;
