import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input, Flex, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { UserContext } from "../contexts/userContext";
import { useLogin } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { userLoginHandler } = useContext(UserContext);
  const { login } = useLogin();

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Failed to login! Please check your credentials.",
      duration: 3, // Duration in seconds
    });
  };

  const loginHandler = async (formData) => {
    setIsPending(true);
    console.log(`Form data:`, formData);
    try {
      const data = await login(formData.email, formData.password);
      userLoginHandler(data);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      errorMessage();
    } finally {
      setIsPending(false);
      form.resetFields();
    }
  };

  const loginAction = (values) => {
    loginHandler(values);
  };

  return (
    <Flex
      wrap
      gap="large"
      justify="center"
      align="center"
      style={{ height: "50vh", display: "flex", flexDirection: "column" }}
    >
      {contextHolder}
      <Typography.Title level={2} style={{ marginBottom: "20px" }}>
        Login
      </Typography.Title>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 560 }}
        onFinish={loginAction}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" disabled={isPending}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text type="secondary" style={{ marginTop: "10px" }}>
        Don't have an account? Ask our admin to create one for you.
      </Typography.Text>
    </Flex>
  );
}
