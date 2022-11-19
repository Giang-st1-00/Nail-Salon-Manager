import React from 'react';
import {
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
  Input,
  FormInstance,
  DatePicker, Space, Button, MenuProps, Menu,
  Cascader,
  InputNumber,
} from "antd";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DownOutlined,
  BarsOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import { IFilter, IJob, IUser } from "../../model";
import { useDispatch, useSelector } from "react-redux";
import remainingJob from "../../redux/selectors/job";
import { addJob, changeStatus, deleteJob, editJob } from "../../redux/slices/job";
import CommonButton from "../../components/Button";
import { v4 as uuidv4 } from "uuid";
import remainingUser from '../../redux/selectors/user';
import Select from "rc-select";

const cx = classNames.bind(style);
const { confirm } = Modal;
const { RangePicker } = DatePicker;

interface Option {
  value: string | number;
  label: string;
}

function Job() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formFilterRef = useRef<FormInstance>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dataJob: Array<IJob> = useSelector(remainingJob);
  const dataUser: Array<IUser> = useSelector(remainingUser);
  const { Option } = Select;
  
  const { Search } = Input;

  const options: Option[] = dataUser.map((item,index) => {
    return {
      label : `${item.name}`,
      value : `${item.name}`,
    }
  })

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

  const itemsActionRow = [
    { key: "edit", label: "Update" },
    {
      key: "delete",
      label: "Delete",
    },
  ];

  const showModalCreate = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const getUserByName = (nameEmployee : string) => {
    let userSelected = dataUser.find((user) => user.name == nameEmployee)
    return userSelected;
  };

  const handleSubmitDataJob = (job: IJob) => {
    if (job.key) {
      let userSelected = getUserByName(job.nameEmployee);
      if (userSelected) {
        dispatch(editJob({ ...job, nameEmployee : userSelected.name , idEmployee : userSelected.key}));
      }
    } else {
      const newJob: IJob = {
        ...job,
        time: new Date(),
        key: uuidv4(),
      };
      dispatch(addJob(newJob));
    }
    setIsModalOpen(false);
  };

  const showConfirmDeleteUSer = (key: string) => {
    confirm({
      title: "Are you sure delete this record?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteJob(key));
      },
      onCancel() {},
    });
  };

  const handleMenuRowClick = (key: string, record: IJob) => {
    form.setFieldsValue({...record , time : record.time.toLocaleString()});
    key === "edit" ? setIsModalOpen(true) : showConfirmDeleteUSer(record.key);
  };

  //--------------------------------TABLE---------------------------------
  const columns: ColumnsType<IJob> = [
    {
      title: "Name Job",
      width: 70,
      dataIndex: "nameJob",
      key: "nameJob",
      fixed: "left",
    },
    {
      title: "Description",
      width: 100,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      width: 50,
      dataIndex: "time",
      key: "time",
      render: (date: Date) => {
        return date.toLocaleString();
      },
    },
    {
      title: "Name Employee",
      dataIndex: "nameEmployee",
      key: "nameEmployee",
      width: 80,
    },

    {
      title: "Name Product",
      dataIndex: "nameProduct",
      key: "nameProduct",
      width: 100,
    },
    {
      title: "Quantity",
      dataIndex: "quantityProduct",
      key: "quantityProduct",
      align: "center",
      width: 80,
    },
    {
      title: "Price",
      dataIndex: "priceProduct",
      key: "priceProduct",
      align: "center",
      width: 80,
    },
    {
      title: "Color",
      dataIndex: "colorProduct",
      key: "colorProduct",
      width: 80,
      align: "center",
    },

    {
      title: "Name Customer",
      dataIndex: "nameCustomer",
      key: "nameCustomer",
      width: 80,
    },
    {
      title: "Customer Pay",
      dataIndex: "customerPay",
      key: "customerPay",
      width: 80,
      align: "center",
    },

    {
      title: "Action",
      fixed: "right",
      dataIndex: "operation",
      width: 50,
      key: "operation",
      render: (text: string, record: IJob) => (
        <Dropdown
          menu={{
            items: itemsActionRow,
            onClick: ({ key }) => {
              handleMenuRowClick(key, record);
            }
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className={cx("contentInner")}>
      <Form
        className={cx("toolBar")}
        name="filter-job"
        layout="horizontal"
        ref={formFilterRef}
        onFinish={handleFilter}
      >
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <Form.Item name="name" shouldUpdate>
              <Search
                placeholder="Search Name Job ."
                onSearch={() => formFilterRef.current?.submit()}
              ></Search>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="date"
              valuePropName="date"
              label="CreateTime"
              colon={false}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={9}>
              <Row gutter={[16,16]}>
              <Col span={4}>
                <Form.Item shouldUpdate>
                    <CommonButton type="primary" htmlType="submit">
                      Search
                    </CommonButton>
                </Form.Item>
              </Col>
              <Col span={4} offset={2}>
                <Form.Item shouldUpdate>
                    <CommonButton type="default" onClick={handleResetForm}>
                      Reset
                    </CommonButton>
                </Form.Item>
              </Col>
              <Col span={4} offset={10}>
                <CommonButton type="default" onClick={showModalCreate}>
                  Create
                </CommonButton>
              </Col>
              </Row>
          </Col>
        </Row>
      </Form>

      <Table
        className={cx("tableJob")}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataJob}
        scroll={{ x: 2000, y: 600 }}
      />

      <Modal
        className={cx("modalUpdate")}
        title="Update Job"
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
              .then((values) => {
                handleSubmitDataJob(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
        }}
        onCancel={() =>  setIsModalOpen(false)}
      >
        <Form
          form={form}
          className={cx("control")}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item name="key" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="nameJob"
            label="Name Job"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input description!" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="time" label="Time">
            <Input disabled/>
          </Form.Item>

          <Form.Item name="idEmployee" hidden>
          </Form.Item>

          <Form.Item name="nameEmployee" label="Name Employee" rules={[{ required: true }]}>
            <Cascader options={options} placeholder="Please select" />
          </Form.Item>

          <Form.Item name="nameProduct" hidden>
          </Form.Item>

          <Form.Item name="quantityProduct" hidden>
          </Form.Item>

          <Form.Item name="priceProduct" hidden>
          </Form.Item>

          <Form.Item name="colorProduct" hidden>
          </Form.Item>

          <Form.Item name="nameCustomer" label="Name Customer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="customerPay" label="Pay" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Job;
