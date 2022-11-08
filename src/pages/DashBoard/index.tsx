import Button from "../../components/Button";
import Input from "../../components/Input";
import classNames from "classnames/bind";

function DashBoard() {
  return <div style={{ height: "1000px" }}>
    This is page DashBoard
    <Button>Khải Huyền</Button>
    <Input allowClear placeholder="Khải Huyền"/>
  </div>;
}

export default DashBoard;
