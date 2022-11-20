import React from "react";
import {
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
  Input,
  FormInstance,
  DatePicker,
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
import { IFilter, IJob, IProduct, IUser } from "../../model";
import { useDispatch, useSelector } from "react-redux";
import {
  addJob,
  changeStatus,
  deleteJob,
  editJob,
} from "../../redux/slices/job";
import CommonButton from "../../components/Button";
import { v4 as uuidv4 } from "uuid";
import {
  remainingProduct,
  remainingUser,
  remainingJob,
} from "../../redux/selectors";

const cx = classNames.bind(style);
const { confirm } = Modal;
const { RangePicker } = DatePicker;

type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

function Job() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formFilterRef = useRef<FormInstance>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dataJob: Array<IJob> = useSelector(remainingJob);
  const dataUser: Array<IUser> = useSelector(remainingUser);
  const dataProduct: Array<IProduct> = useSelector(remainingProduct);
  const { Search } = Input;
  const [maxQuantityProduct, setMaxQuantityProduct] = useState<number>();
  const [quantityProduct, setQuantityProduct] = useState<number>(0);

  const employeeOptions: Option[] = dataUser.map((item, index) => {
    return {
      value: item.key,
      label: item.name,
    };
  });

  const optionProduct = dataProduct.map((product) => ({
    value: product.key,
    label: product.name + " - " + product.color,
  }));

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

  const getUserById = (nameEmployee: string) => {
    let userSelected = dataUser.find((user) => user.key == nameEmployee);
    return userSelected;
  };

  const getProductById = (nameProduct: string) => {
    let productSelected = dataProduct.find(
      (product) => product.key == nameProduct
    );
    return productSelected;
  };

  const getMaxItemProduct = (key: string) => {
    let product = getProductById(key);
    if (product) {
      let max = product.remainingQuantity;
      setMaxQuantityProduct(max);
    }
  };

  const handleSubmitDataJob = (job: IJob) => {
    let userSelected = getUserById(job.idEmployee);
    let productSelected = getProductById(job.idProduct);
    const countQuantityEdit = job.quantityProduct - quantityProduct;
    if (job.key && userSelected && productSelected) {
      dispatch(
        editJob({
          ...job,
          nameEmployee: userSelected.name,
          idEmployee: userSelected.key,
          nameProduct: productSelected.name,
          idProduct: productSelected.key,
          priceProduct: productSelected.price,
          colorProduct: productSelected.color,
          countQuantityEdit,
        })
      );
    }

    if (!job.key && userSelected && productSelected) {
      const newJob: IJob = {
        ...job,
        nameEmployee: userSelected.name,
        idEmployee: userSelected.key,
        nameProduct: productSelected.name,
        idProduct: productSelected.key,
        priceProduct: productSelected.price,
        colorProduct: productSelected.color,
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
    setQuantityProduct(record.quantityProduct);
    form.setFieldsValue({ ...record, time: record.time.toLocaleString() });
    key === "edit" ? setIsModalOpen(true) : showConfirmDeleteUSer(record.key);
  };

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
      title: "Time Create",
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
            },
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
            <Row gutter={[16, 16]}>
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
        title="Modal Job"
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
        onCancel={() => setIsModalOpen(false)}
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

          <Form.Item
            name="nameJob"
            label="Name Job"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="time" label="Time" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="idEmployee"
            label="Name Employee"
            rules={[{ required: true }]}
          >
            <Cascader options={employeeOptions} placeholder="Please select" />
          </Form.Item>

          <Form.Item
            name="idProduct"
            label="Name Product"
            rules={[{ required: true }]}
          >
            <Cascader
              onChange={() => {
                getMaxItemProduct(form.getFieldValue("idProduct"));
              }}
              options={optionProduct}
              placeholder="Please select"
            />
          </Form.Item>

          <Form.Item name="quantityProduct" label="quantity">
            <InputNumber min={0} max={maxQuantityProduct} />
          </Form.Item>

          <Form.Item
            name="nameCustomer"
            label="Name Customer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="customerPay"
            label="Pay"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Job;
