import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input, Flex, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { useRegister } from "../../api/authApi";

export default function Create() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const { register } = useRegister(); // Use the custom hook to register a user

    const errorMessage = () => {
        messageApi.open({
            type: "error",
            content: "Failed to login! Please check your credentials.",
            duration: 3, // Duration in seconds
        });
    };

    const successMessage = () => {
        messageApi.open({
            type: "success",
            content: "Registration successful!",
            duration: 3, // Duration in seconds
        });
    };

    const registerAction = async (values) => {
        setIsPending(true);
        try {
            const { email, password } = values; // Extract only email and password
            const data = { email, password }; // Create a new object with only these fields
            await register(data); // Call the register function with the filtered data
            successMessage(); // Show success message after successful registration
            navigate("/"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration error:", error); // Log the error for debugging
            errorMessage(); // Show error message if registration fails
        } finally {
            setIsPending(false); // Ensure this is always called
        }
    };

    return (
        <Flex
            wrap
            gap="large"
            justify="center"
            align="center"
            style={{ height: "50vh", display: "flex", flexDirection: "column" }}
        >
            <Form
                form={form}
                name="register"
                onFinish={registerAction}
                style={{ maxWidth: 560 }}
            >
                {contextHolder}
                <Typography.Title level={2} style={{ marginBottom: "20px" }}>
                    Register a new user
                </Typography.Title>
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

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords that you\'ve entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isPending}>
                        Register Account
                    </Button>
                </Form.Item>

            </Form>
        </Flex>
    );
};
