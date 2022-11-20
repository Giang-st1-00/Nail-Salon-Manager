import { useState, useRef } from "react";
import { Form, Row, Col, DatePicker, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import { useSelector, useDispatch } from "react-redux";

import CommonButton from "../../components/Button";
import CommonInput from "../../components/Input";
import { IFilter } from "../../model";
import { remainingSalary } from "../../redux/selectors";
import { changeStatus } from "../../redux/slices/salary";

const { RangePicker } = DatePicker;

function Salary() {
  const formFilterRef = useRef<FormInstance>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dataUser = useSelector(remainingSalary);
  const dispatch = useDispatch();
  const columns = [
    {
      key: "name",
      title: "Name Employee",
      dataIndex: "name",
    },
    {
      key: "salary",
      title: "Salary",
      dataIndex: "salary",
      render: (salary: number) => {
        return salary + "$";
      },
    },
  ];
  const handleFilter = (values: IFilter) => {
    if (values.name || values.date) {
      const name = values.name ? values.name : "";
      const date = values.date
        ? [values.date[0].toLocaleString(), values.date[1].toLocaleString()]
        : ["", ""];
      dispatch(
        changeStatus({
          name,
          date,
        })
      );
    }
  };

  const handleResetForm = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(
        changeStatus({
          name: "",
          date: ["", ""],
        })
      );
      formFilterRef.current?.resetFields();
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <Form
        ref={formFilterRef}
        name="filter-product"
        layout="horizontal"
        onFinish={handleFilter}
      >
        <Row gutter={[24, 24]}>
          <Col span={7}>
            <Form.Item name="name" shouldUpdate>
              <CommonInput
                placeholder="Search Name"
                onSearch={() => formFilterRef.current?.submit()}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="date"
              valuePropName="date"
              label="CreateTime"
              colon={false}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Form.Item shouldUpdate>
                  {() => (
                    <CommonButton type="primary" htmlType="submit">
                      Search
                    </CommonButton>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item shouldUpdate>
                  {() => (
                    <CommonButton type="default" onClick={handleResetForm}>
                      Reset
                    </CommonButton>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataUser}
        pagination={{ showQuickJumper: true }}
      />
    </div>
  );
}

export default Salary;
