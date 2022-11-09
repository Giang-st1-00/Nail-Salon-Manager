import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";

function DashBoard() {
  return (
    <div style={{ height: "1000px" }}>
      <div>This is page DashBoard</div>
      This is page DashBoard
      <Button type="default">Search</Button>
      <Input
        // suffix={<SearchOutlined/>}
        search
        allowClear
        placeholder="Search Name"
      />
    </div>
  );
}

export default DashBoard;
