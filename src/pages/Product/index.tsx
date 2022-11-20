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
  InputNumber,
  Select,
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
import { IProduct, IFilter } from "../../model";
import { remainingProduct } from "../../redux/selector";
import {
  addProduct,
  deleteProduct,
  deleteListProduct,
  editProduct,
  changeStatus,
  addExistProduct,
} from "../../redux/slices/product";
import style from "./index.module.scss";

const cx = classNames.bind(style);
const { RangePicker } = DatePicker;
const { confirm } = Modal;
function Product() {
  const [form] = Form.useForm();
  const formFilterRef = useRef<FormInstance>(null);
  const formAddExistProduct = useRef<FormInstance>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAddProduct, setIsModalAddProduct] = useState<boolean>(false);
  const [isModalAddExistProduct, setIsModalAddExistProduct] =
    useState<boolean>(false);
  const [isShowStatistical, setShowStatistical] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const dispatch = useDispatch();
  const dataProduct: Array<IProduct> = useSelector(remainingProduct);
  const optionProduct = dataProduct.map((product) => ({
    value: product.key,
    label: product.name + " - " + product.color,
  }));
  const itemsActRow = [
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
      title: "Name Product",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => {
        return price + "$ x 1";
      },
    },
    {
      title: "Quantity Remaining",
      dataIndex: "quantity",
    },
    {
      title: "Color",
      dataIndex: "color",
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
      render: (text: string, record: IProduct) => (
        <Dropdown
          menu={{
            items: itemsActRow,
            onClick: ({ key }) => handleMenuRowClick(key, record),
          }}
        >
          <CommonButton border={false}>
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

  const showModalAddNewProduct = () => {
    form.resetFields();
    setIsModalAddProduct(true);
  };

  const showModalAddProduct = () => {
    formAddExistProduct.current?.resetFields();
    setIsModalAddExistProduct(true);
  };
  
  const handleAddExistProduct = (data: { key: string; quantity: number }) => {
    dispatch(addExistProduct(data));
    setIsModalAddExistProduct(false);
  };

  const handleSubmitDataProduct = (product: IProduct) => {
    
    if (product.key) {
      dispatch(editProduct(product));
    } else {
      const newUser: IProduct = {
        ...product,
        createTime: new Date(),
        key: uuidv4(),
      };
      dispatch(addProduct(newUser));
    }
    setIsModalAddProduct(false);
  };

  const showConfirmDeleteUSer = (key: string) => {
    confirm({
      title: "Are you sure delete this record?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteProduct(key));
      },
      onCancel() {},
    });
  };

  const handleDeleteListUser = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(deleteListProduct(selectedRowKeys));
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const handleMenuRowClick = (key: string, record: IProduct) => {
    form.setFieldsValue(record);
    key === "edit"
      ? setIsModalAddProduct(true)
      : showConfirmDeleteUSer(record.key);
  };

  const handleShowStatistical = () => {
    setShowStatistical(true);
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
              <Col>
                <Form.Item shouldUpdate>
                  {() => (
                    <CommonButton type="primary" htmlType="submit">
                      Search
                    </CommonButton>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item shouldUpdate>
                  {() => (
                    <CommonButton type="default" onClick={handleResetForm}>
                      Reset
                    </CommonButton>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <CommonButton type="default" onClick={showModalAddNewProduct}>
                  Add New Product
                </CommonButton>
              </Col>
              <Col>
                <CommonButton type="default" onClick={showModalAddProduct}>
                  Add Existing Product
                </CommonButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Modal
        title="modal-product"
        open={isModalAddProduct}
        onCancel={() => {
          setIsModalAddProduct(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmitDataProduct(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form-product"
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
            label="Name Product"
            rules={[
              {
                required: true,
                message: "Please input employee name!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input price product!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input employee quantity!",
              },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[
              {
                required: true,
                message: "Please input employee color!",
              },
            ]}
          >
            <CommonInput />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="modal-add-exist-product"
        open={isModalAddExistProduct}
        onCancel={() => {
          setIsModalAddExistProduct(false);
        }}
        onOk={() => {
          formAddExistProduct.current
            ?.validateFields()
            .then((values) => {
              handleAddExistProduct(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          ref={formAddExistProduct}
          initialValues={{}}
          name="form-product"
          scrollToFirstError
          {...formItemLayout}
        >
          <Form.Item
            name="key"
            label="Name Product"
            rules={[
              {
                required: true,
                message: "Please input employee name!",
              },
            ]}
          >
            <Select dropdownMatchSelectWidth={false} options={optionProduct} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input employee quantity!",
              },
            ]}
          >
            <InputNumber min={0} max={100} />
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
        dataSource={dataProduct}
        pagination={{ showQuickJumper: true }}
      />
      <CommonButton onClick={handleShowStatistical}>statistical</CommonButton>
    </div>
  );
}

export default Product;
