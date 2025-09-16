import React from "react";
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
import { CarOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const DriverForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    notification.success({
      message: "Registration Successful 🎉",
      description: `Driver ${values.name} has been registered successfully!`,
      placement: "topRight",
    });

    form.resetFields();
  };

  return (
    <div
      style={{
        minHeight: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f7fa, #c94ae9ff)",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1890ff, #36cfc9)",
            padding: "20px 16px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <CarOutlined
            style={{
              fontSize: "28px",
              color: "#fff",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "6px",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
          <Title
            level={3}
            style={{
              color: "#fff",
              margin: 0,
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "0.5px",
            }}
          >
            Driver Registration
          </Title>
        </div>
        <div style={{ padding: "24px" }}>
          <Form layout="vertical" initialValues={{ vehicleType: "Commercial" }} form={form} onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                placeholder="Enter your name"
                style={{ borderRadius: 8, padding: "10px" }}
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
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                style={{ borderRadius: 8, padding: "10px" }}
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
                placeholder="Enter license number"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                style={{ borderRadius: 8, padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="License Date"
              name="licenseAppliedDate"
              rules={[
                { required: true, message: "Please select the applied date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                disabledDate={(current) => current && current > dayjs()}
              />
            </Form.Item>
            <Form.Item
              label="Valid Date"
              name="Valid Date"
              rules={[
                { required: true, message: "Please select the Valid date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                disabledDate={(current) => current && current > dayjs()}
              />
            </Form.Item>
            

            
            <Form.Item
              label="Type of Vehicle"
              name="vehicleType"
              rules={[
                { required: true, message: "Please select vehicle type" },
              ]}
            >
              <Select
                placeholder="Select vehicle type"
                style={{ borderRadius: 8 }}
                defaultValue="Commercial" 
              >
                <Option value="Private">Private Vehicle</Option>
                <Option value="Commercial">Commercial Vehicle</Option>
                <Option value="Construction">OwnBoard Vehicle</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Types of License"
              name="license type"
              rules={[
                { required: true, message: "Please select vehicle type" },
              ]}
            >
              <Select
                placeholder="Select vehicle type"
                style={{ borderRadius: 8 }}
              >
                <Option value="light">LMV</Option>
                <Option value="heavy">HGV</Option>
                <Option value="MGV">MGV</Option>
                <Option value="HTV">HTV</Option>
                <Option value="Trailer">Trailer</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  borderRadius: 8,
                  height: 45,
                  fontWeight: 600,
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #1890ff, #36cfc9)",
                  border: "none",
                }}
              >
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
