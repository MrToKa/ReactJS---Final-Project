import { useState } from "react";

import { Button, Form, Input, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import EmployeeService from "../../../services/EmployeeService";

export default function CreateEmployeeButton({ reloadEmployees, resetStyles }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const submitAction = async (values) => {
        const data = { ...values };
        data.currentProject = ""; // Set currentProject to empty string
        data.email = data.firstName + "." + data.lastName + "@example.com"; // Generate email from first and last name
        data.password = data.firstName + data.lastName; // Generate password from first and last name
        data.previousProjects = []; // Initialize previousProjects as an empty array
        data.instruments = []; // Initialize instruments as an empty array
        await EmployeeService.create(data);
        setOpen(false);
        reloadEmployees();
        resetStyles(); // Reset styles of other buttons
    }

    return (
        <>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>
                Create Employee
            </Button>
            <Modal
                open={open}
                title="Create a new Employee"
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{ autoFocus: true, htmlType: "submit" }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="Create Employee Modal"
                        clearOnDestroy
                        onFinish={(values) => submitAction(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "Please fill in the first name of the employee!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: "Please fill in the last name of the employee!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>                
                <Form.Item
                name="job"
                label="Job"
                rules={[
                    {
                        required: true,
                        message: "Please fill in the job of the employee!",
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image URL"
                    rules={[
                        {
                            required: true,
                            message: "Please fill in the image URL of the employee!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                </Modal>
        </>
    );
}
