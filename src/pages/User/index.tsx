import { useState, useRef } from "react";
import {
  Form,
  Row,
  Col,
  DatePicker,
  Table,
  Modal,
  Popconfirm,
  Dropdown,
  Radio,
  InputNumber,
  Cascader,
} from "antd";
import type { FormInstance } from "antd/es/form";
import {
  DownOutlined,
  BarsOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames/bind";

import CommonButton from "../../components/Button";
import CommonInput from "../../components/Input";
import { IUser, IFilter } from "../../model";
import { remainingUser } from "../../redux/selector";

import {
  addUser,
  deleteUser,
  deleteListUSer,
  editUser,
  changeStatus,
} from "../../redux/slices/user";
import style from "./index.module.scss";

const cx = classNames.bind(style);
const { RangePicker } = DatePicker;
const { confirm } = Modal;

function User() {
  const [form] = Form.useForm();
  const formFilterRef = useRef<FormInstance>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const dataUser: Array<IUser> = useSelector(remainingUser);
  const dispatch = useDispatch();

  const itemsActionRow = [
    { key: "edit", label: "Update" },
    {
      key: "delete",
      label: "Delete",
    },
  ];
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Nick Name",
      dataIndex: "nickName",
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      render: (date: Date) => {
        return date.toLocaleString();
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      width: "100px",
      key: "operation",
      render: (text: string, record: IUser) => (
        <Dropdown
          menu={{
            items: itemsActionRow,
            onClick: ({ key }) => handleMenuRowClick(key, record),
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
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

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

  const showModalCreate = () => {
    form.resetFields();
    setIsModal(true);
  };

  const handleSubmitDataUser = (user: IUser) => {
    if (user.key) {
      dispatch(editUser(user));
    } else {
      const newUser: IUser = {
        ...user,
        createTime: new Date(),
        key: uuidv4(),
      };
      dispatch(addUser(newUser));
    }
    setIsModal(false);
  };

  const showConfirmDeleteUSer = (key: string) => {
    confirm({
      title: "Are you sure delete this record?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteUser(key));
      },
      onCancel() {},
    });
  };

  const handleDeleteListUser = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(deleteListUSer(selectedRowKeys));
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const handleMenuRowClick = (key: string, record: IUser) => {
    form.setFieldsValue(record);
    key === "edit" ? setIsModal(true) : showConfirmDeleteUSer(record.key);
  };

  return (
    <div>
      <Form
        ref={formFilterRef}
        name="filter-user"
        layout="horizontal"
        onFinish={handleFilter}
      >
        <Row gutter={[24, 24]}>
          <Col span={7}>
            <Form.Item name="name" shouldUpdate>
              <CommonInput
                search
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
              <Col span={4} offset={12}>
                <CommonButton type="default" onClick={showModalCreate}>
                  Create
                </CommonButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Modal
        title="modal-user"
        open={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmitDataUser(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form-user"
          initialValues={{}}
          scrollToFirstError
          {...formItemLayout}
        >
          <Form.Item name="key" hidden>
            <CommonInput />
          </Form.Item>
          <Form.Item name="createTime" hidden>
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input employee name!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item name="nickName" label="NickName">
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input employee age!",
              },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input employee address!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please choose employee gender!",
              },
            ]}
          >
            <Radio.Group name="radiogroup">
              <Radio value="male">male</Radio>
              <Radio value="female">female</Radio>
            </Radio.Group>
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
              onConfirm={handleDeleteListUser}
              okText="OK"
              cancelText="Cancel"
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
        dataSource={dataUser}
        pagination={{ showQuickJumper: true }}
      />
    </div>
  );
}

export default User;
