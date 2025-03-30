import { useActionState, useContext } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input, Flex, Typography, message, Space } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from "../contexts/userContext";
import { useLogin } from "../api/authApi";



export default function Login() {
  const navigate = useNavigate(); 

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm(); 
  const { userLoginHandler } = useContext(UserContext);
  const { login } = useLogin(); 

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Failed to login! Please check your credentials.',
      duration: 3, // Duration in seconds
    });
  };
  
const loginHandler = async (_, formData) => {
  try
  {
  const data = await login(formData.email, formData.password);
  userLoginHandler(data);
  console.log(data);
  navigate("/"); 
  }
  catch (error) {
    console.error("Login failed!!!!!!!!!!!!!!:", error);
    // Handle login error (e.g., show a message to the user)  
    {errorMessage()}  
  }
  finally {
    form.resetFields(); // Reset form fields after submission
  }
}

const [_, loginAction, isPending] = useActionState(loginHandler, {email: '', password: ''});   

  return (    
    <Flex
      wrap
      gap="large"
      justify="center"
      align="center"
      style={{ height: "50vh", display: "flex", flexDirection: "column" }} // Stack items vertically
    >
      {contextHolder}
      <Typography.Title level={2} style={{ marginBottom: "20px" }}>
        Login
      </Typography.Title>
      <Form
        form={form} // Bind the form instance to the Form component
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 560 }}
        onFinish={loginAction}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
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
