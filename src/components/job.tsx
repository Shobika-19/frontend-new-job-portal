import React, { useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Typography,
  Card,
  notification,
  Select,
} from "antd";
import dayjs from "dayjs";
import {
  CarOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CalendarOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import "./App.css";

const { Title } = Typography;
const { Option } = Select;

const DriverForm: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {

    const card = document.querySelector(".driver-card");
    if (card) {
      card.classList.add("pop-in");
    }
  }, []);

  const onFinish = (values: any) => {
    notification.success({
      message: "Registration Successful 🎉",
      description: `Driver ${values.name} has been registered successfully!`,
      placement: "topRight",
    });

    form.resetFields();
  };

  return (
    <div className="driver-container">
      <Card className="driver-card">

        <div className="driver-header">
          <CarOutlined className="driver-icon" />
          <Title level={3} className="driver-title">
            Driver Registration
          </Title>
        </div>

        <div style={{ padding: "24px" }}>
          <Form
            layout="vertical"
            initialValues={{ vehicleType: "Commercial" }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="Enter your name"
                className="input-field"
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: "#1890ff" }} />}
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="input-field"
              />
            </Form.Item>

            <Form.Item
              label="License Number"
              name="license"
              rules={[
                { required: true, message: "Please enter license number" },
                { pattern: /^[0-9]+$/, message: "Only numbers are allowed" },
              ]}
            >
              <Input
                prefix={<IdcardOutlined style={{ color: "#1890ff" }} />}
                placeholder="Enter license number"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="input-field"
              />
            </Form.Item>

            <Form.Item
              label="License Date"
              name="licenseAppliedDate"
              rules={[{ required: true, message: "Please select the applied date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                suffixIcon={<CalendarOutlined style={{ color: "#1890ff" }} />}
                disabledDate={(current) => current && current > dayjs()}
                className="input-field"
              />
            </Form.Item>

            <Form.Item
              label="Valid Date"
              name="validDate"
              rules={[{ required: true, message: "Please select the valid date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                suffixIcon={<CalendarOutlined style={{ color: "#1890ff" }} />}
                disabledDate={(current) => current && current > dayjs()}
                className="input-field"
              />
            </Form.Item>

            <Form.Item
              label="Type of Vehicle"
              name="vehicleType"
              rules={[{ required: true, message: "Please select vehicle type" }]}
            >
              <Select
                placeholder="Select vehicle type"
                className="input-field"
                suffixIcon={<AuditOutlined style={{ color: "#1890ff" }} />}
              >
                <Option value="Private">Private Vehicle</Option>
                <Option value="Commercial">Commercial Vehicle</Option>
                <Option value="Construction">OwnBoard Vehicle</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Types of License"
              name="licenseType"
              rules={[{ required: true, message: "Please select license type" }]}
            >
              <Select
                placeholder="Select license type"
                className="input-field"
                suffixIcon={<IdcardOutlined style={{ color: "#1890ff" }} />}
              >
                <Option value="light">LMV</Option>
                <Option value="heavy">HGV</Option>
                <Option value="MGV">MGV</Option>
                <Option value="HTV">HTV</Option>
                <Option value="Trailer">Trailer</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="submit-btn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default DriverForm;
