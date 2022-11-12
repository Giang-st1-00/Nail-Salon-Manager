import { useState } from "react";
import {
  Form,
  Row,
  Col,
  DatePicker,
  Table,
  Modal,
  Popconfirm,
  Dropdown,
} from "antd";
import { DownOutlined, BarsOutlined } from "@ant-design/icons";

import CommonButton from "../../components/Button";
import CommonInput from "../../components/Input";
import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
const { RangePicker } = DatePicker;
// template type
interface IUser {
  key: string;
  name: string;
  age: number;
  address: string;
}
function User() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setIsModalAdd] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSelectedRowKey, setDataSelectRowKey] = useState<IUser>();
  // fetch data
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      key: "keydata" + i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  // config form in modal
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const onSelectChangeRow = (
    selectedRowKeys: React.Key[],
    selectedRows: Array<IUser>
  ) => {
    console.log("data: ", selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChangeRow,
  };
  const showModal = () => {
    setIsModalAdd(true);
  };
  const handleCancelAdd = () => {
    setIsModalAdd(false);
  };
  const handleCancelEdit = () => {
    setIsModalEdit(false);
  };
  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };
  const start = () => {
    setLoading(true);
    console.log(selectedRowKeys);
    console.log(dataSelectedRowKey);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  // handlerClickMenu
  const handleMenuClick = (key: string, record: IUser) => {
    setDataSelectRowKey(record);
    if (key === "1") {
      setIsModalEdit(true);
    }
  };
  // create user
  const onCreate = (values: IUser) => {
    setIsModalAdd(false);
    console.log("Received values of form: ", values);
  };
  // item action table
  const items = [
    { key: "1", label: "Update" },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Are you sure delete these items?"
          placement="left"
          onConfirm={start}
          okText="OK"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
    },
  ];

  // table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Action",
      dataIndex: "operation",
      width: "100px",
      key: "operation",
      render: (text: string, record: IUser) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => handleMenuClick(key, record),
          }}
        >
          <CommonButton className={cx("no-border")}>
            <BarsOutlined />
            <DownOutlined />
          </CommonButton>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Form name="filter-user" layout="horizontal" onFinish={onFinish}>
        <Row gutter={[24, 24]}>
          <Col span={7}>
            <Form.Item name="username">
              <CommonInput search placeholder="Search Name" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="date"
              valuePropName="date"
              label="CreateTime"
              shouldUpdate
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
                    <CommonButton type="default" htmlType="submit">
                      Reset
                    </CommonButton>
                  )}
                </Form.Item>
              </Col>
              <Col span={4} offset={12}>
                <CommonButton type="default" onClick={showModal}>
                  Create
                </CommonButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Create User"
        open={isModalAdd}
        onCancel={handleCancelAdd}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="register"
          initialValues={dataSelectedRowKey}
          scrollToFirstError
          {...formItemLayout}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="NickName"
            rules={[
              {
                required: true,
                message: "Please input your Nick Name!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Create User"
        open={isModalEdit}
        onCancel={handleCancelEdit}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="register"
          initialValues={dataSelectedRowKey}
          scrollToFirstError
          {...formItemLayout}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="NickName"
            rules={[
              {
                required: true,
                message: "Please input your Nick Name!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
        </Form>
      </Modal>
      <div className={cx("action-delete")}>
        {selectedRowKeys.length > 0 && (
          <>
            <span className={cx("count-select")}>
              Selected {selectedRowKeys.length} items
            </span>
            <Popconfirm
              title="Are you sure delete these items?"
              placement="left"
              onConfirm={start}
              okText="OK"
              cancelText="No"
            >
              <CommonButton type="primary">Remove</CommonButton>
            </Popconfirm>
          </>
        )}
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ showQuickJumper: true }}
      />
    </div>
  );
}

export default User;
