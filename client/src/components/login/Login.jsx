import React from "react";

import { Button, Checkbox, Form, Input, Flex, Typography } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
  return (
    <Flex
      wrap
      gap="large"
      justify="center"
      align="center"
      style={{ height: "50vh", display: "flex" }} // Center vertically and horizontally
    >
      <Form
        name="login"
        labelCol={{ span: 24 }} // Make labels span the full width
        wrapperCol={{ span: 24 }} // Align input fields with labels
        style={{
          width: "100%",
          maxWidth: 400,
          textAlign: "center", // Center text inside the form
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
            <Typography>
                No account? Contact our administrator to create one for you.
            </Typography>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
