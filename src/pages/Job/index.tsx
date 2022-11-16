import {
  Avatar,
  Cascader,
  Col,
  Dropdown,
  Form,
  MenuProps,
  Modal,
  Row,
  Input as AntdInput,
  DatePickerProps,
} from "antd";
import classNames from "classnames/bind";
import Button from "../../components/Button";
import style from "./index.module.scss";
import { DatePicker, Space, Button as AntdButton } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  UnorderedListOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { IJob } from "../../model";
import { removeJob, updateJob } from "../../redux/slices/job";
import { useDispatch, useSelector } from "react-redux";
import { updateAllSearch, updateNameJob  } from "../../redux/slices/job/search";
import { remainingJob } from "../../redux/selectors/job";




const cx = classNames.bind(style);
function Job() {
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<IJob>({});

  const dataJob = useSelector(remainingJob);
  const [nameSearch, setNameSearch] = useState("");
  const [valueCalendar, setValueCalendar] = useState("2022/01/01");
  const { Search } = AntdInput;

  const dateFormat = 'YYYY/MM/DD';

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={(e) => {
            console.log(selectedUpdate);
            setIsModalOpen(true);
          }}
        >
          Update
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          onClick={() => {
            dispatch(removeJob(selectedUpdate));
          }}
        >
          Delete
        </div>
      ),
      key: "2",
    },
  ];

  const submitDataJob = () => {
    dispatch(updateJob(selectedUpdate));
    setIsModalOpen(false);
  };


 
  //--------------------------------TABLE---------------------------------
  const columns: ColumnsType<IJob> = [
    {
      title: "ID",
      width: 30,
      dataIndex: "id",
      key: "id",
      fixed: "left",
      align: "center",
    },
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
      title: "Date",
      width: 50,
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ID Employee",
      width: 50,
      dataIndex: "idEmployee",
      key: "idEmployee",
      align: "center",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: 40,
    },
    {
      title: "Name Employee",
      dataIndex: "nameEmployee",
      key: "nameEmployee",
      width: 80,
    },

    {
      title: "ID Product",
      dataIndex: "idProduct",
      key: "idProduct",
      width: 50,
      align: "center",
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
      dataIndex: "customer",
      key: "customerPay",
      width: 80,
      align: "center",
    },

    {
      title: "Operation",
      width: 50,
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
    },
  ];

  const data: IJob[] = [];

  dataJob.map((item: any, index: any) => {
    data.push({
      id: item.id,
      nameJob: `${item.nameJob}`,
      description: `${item.description}`,
      date: `${item.date}`,

      idEmployee: item.idEmployee,
      nameEmployee: `${item.nameEmployee}`,
      avatar: <Avatar icon={<UserOutlined />} />,

      idProduct: item.idProduct,
      nameProduct: `${item.nameProduct}`,
      quantityProduct: item.quantityProduct,
      priceProduct: item.priceProduct,

      nameCustomer: `${item.nameCustomer}`,
      customerPay: item.customerPay,
      colorProduct: `${item.colorProduct}`,

      operation: (
        <Dropdown menu={{ items }}>
          <AntdButton
            onMouseEnter={() => {
              setSelectedUpdate({
                id: item.id,
                nameJob: `${item.nameJob}`,
                description: `${item.description}`,
                date: `${item.date}`,
              });
            }}
          >
            <UnorderedListOutlined />
            <DownOutlined />
          </AntdButton>
        </Dropdown>
      ),
    });
  });

  const rowSelection = {
    getCheckboxProps: (record: IJob) => ({
      disabled: record.nameJob === "Disabled Job",
      name: record.nameJob,
    }),
  };

  return (
    <div className={cx("contentInner")}>
      <Form className={cx("toolBar")}>
        <Row>
          <Col span={6}>
            <Search
              value={nameSearch}
              onChange={(e) => {
                setNameSearch(e.target.value);
              }}
              placeholder="Search Name Job ."
              className={cx("search_nameJob")}
              onSearch={() => {
                dispatch(updateNameJob(nameSearch));
              }}
            ></Search>
          </Col>
          <Col span={8}>
            <span className={cx("label_timeInput")}>CreateTime</span>
            <Space direction="vertical">
              <DatePicker
                value={moment(`${valueCalendar}`, dateFormat)}
                onChange={(date : any, dateString : any) => {
                  setValueCalendar(dateString);
                }}
              />
            </Space>
          </Col>
          <Col span={9}>
            <Row className={cx("feature")}>
              <div className={cx('syntheticSearch')}>
                <AntdButton type="primary" onClick={() => {
                  dispatch(updateAllSearch({valuesearch : nameSearch, valueDate : valueCalendar}));
                }}>Search</AntdButton>
                <AntdButton type="default">Reset</AntdButton>
              </div>
              <AntdButton
                type="default"
                onClick={() => {
                  setSelectedUpdate({});
                  setIsModalOpen(true);
                }}
              >
                Create
              </AntdButton>
            </Row>
          </Col>
        </Row>
      </Form>

      <Table
        className={cx("tableJob")}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 2300, y: 600 }}
      />

      <Modal
        className={cx("modalUpdate")}
        title="Update Job"
        open={isModalOpen}
        onOk={submitDataJob}
        onCancel={() =>  setIsModalOpen(false)}
      >
        <Form
          className={cx("control")}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="ID Job">
            <AntdInput value={`${selectedUpdate.id}`} disabled />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input your name!" }]}
            label="Name Job"
          >
            <AntdInput
              value={`${selectedUpdate.nameJob}`}
              onChange={(e) =>
                setSelectedUpdate((state) => ({
                  ...state,
                  nameJob: `${e.target.value}`,
                }))
              }
            />
          </Form.Item>

          <Form.Item label="Description">
            <AntdInput
              value={`${selectedUpdate.description}`}
              onChange={(e) =>
                setSelectedUpdate((state) => ({
                  ...state,
                  description: `${e.target.value}`,
                }))
              }
            />
          </Form.Item>

          <Form.Item label="Date">
            <AntdInput
              value={`${selectedUpdate.date}`}
              onChange={(e) =>
                setSelectedUpdate((state) => ({
                  ...state,
                  date: `${e.target.value}`,
                }))
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Job;
