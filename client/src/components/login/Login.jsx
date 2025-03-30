import {useContext} from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input, Flex, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from "../contexts/userContext";

export default function Login() {
  const navigate = useNavigate(); // Initialize the navigation hook

  const [form] = Form.useForm(); // Initialize form instance
  const { userLoginHandler } = useContext(UserContext); // Access user context
  
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Simulate a successful login and set user context
    const user = { username: values.username }; // Replace with actual user data
    userLoginHandler(user); // Call the context function to set user
    form.resetFields(); // Reset form fields after submission
    // Redirect to the home page or perform any other action
    navigate("/"); // Navigate to the home page
  };

  return (
    <Flex
      wrap
      gap="large"
      justify="center"
      align="center"
      style={{ height: "50vh", display: "flex", flexDirection: "column" }} // Stack items vertically
    >
      <Typography.Title level={2} style={{ marginBottom: "20px" }}>
        Login
      </Typography.Title>
      <Form
        form={form} // Bind the form instance to the Form component
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 560 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
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
