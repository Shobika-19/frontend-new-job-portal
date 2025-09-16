import React, { useState, useEffect } from "react";
import { Form, Input, Button, Layout, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isOtpVisible, setOtpVisible] = useState<boolean>(false);
  const [isLoginButtonDisabled, setLoginButtonDisabled] =
    useState<boolean>(true);

  const isOtpComplete = enteredOtp.every((digit) => digit !== "");

  useEffect(() => {
    if (sessionStorage.getItem("loginPageOpen")) {
      message.info(
        "Login page is already open in another tab. Please focus that tab."
      );
      navigate("/");
    } else {
      sessionStorage.setItem("loginPageOpen", "true");
    }
    return () => {
      sessionStorage.removeItem("loginPageOpen");
    };
  }, [navigate]);

  useEffect(() => {
    setLoginButtonDisabled(
      !form.getFieldValue("username") || !form.getFieldValue("password")
    );
  }, [form]);

  const onFieldsChange = () => {
    const { username, password } = form.getFieldsValue();
    setLoginButtonDisabled(!(username && password));
  };

  const onFinish = (values: any) => {
    if (!isOtpVisible) {
      setOtpVisible(true);
      message.success("Enter the OTP sent to your device");
    } else {
      const otpInput = enteredOtp.join("");
      if (otpInput.length === 6) {
        message.success("OTP verified successfully!");
        navigate("/job");
      } else {
        message.error("OTP must be exactly 6 digits!");
      }
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const updatedOtp = [...enteredOtp];
    updatedOtp[index] = value;
    setEnteredOtp(updatedOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !enteredOtp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #cc2ed1ff 0%, #E0C3FC 100%)",
          padding: "20px",
        }}
        className="login-background"
      >
        <div
          style={{
            width: "400px",
            padding: "40px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.25)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Welcome Back
          </Title>

          <Form
            form={form}
            name="login_form"
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
                style={{
                  borderRadius: "10px",
                  padding: "10px 15px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                style={{
                  borderRadius: "10px",
                  padding: "10px 15px",
                }}
              />
            </Form.Item>

            {isOtpVisible && (
              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {enteredOtp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      data-testid={`otp-input-${index}`}
                      style={{
                        width: "48px",
                        textAlign: "center",
                        fontSize: "20px",
                        height: "65px",
                        borderRadius: "10px",
                        border: "1px solid #dcdde1",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                        transition: "0.2s",
                      }}
                    />
                  ))}
                </div>
              </Form.Item>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #e040e6ff, #d38ac7ff)",
                  border: "none",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  padding: "12px",
                  transition: "all 0.3s ease",
                }}
                disabled={!isOtpVisible ? isLoginButtonDisabled : !isOtpComplete}
              >
                {isOtpVisible ? "Verify OTP" : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};      
export default LoginPage;
