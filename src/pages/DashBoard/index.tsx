import Button from "../../components/Button";
import Input from "../../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";

function DashBoard() {
  return (
    <div style={{ height: "1000px" }}>
      This is page DashBoard
      <Button type="primary">Search</Button>
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
