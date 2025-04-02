import { useState, useEffect } from "react";

import { Button, Form, Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { useEmployee, useUpdateEmployee } from "../../../api/employeesApi";

export default function EditButton({ employeeId, refreshEmployee }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState({});

  const { employee: fetchEmployee } = useEmployee(); // Fetch employee details
  const { update: updateEmployee } = useUpdateEmployee(); // Fetch all instruments

  useEffect(() => {
    // Fetch employee data and set it to state
    fetchEmployee(employeeId).then((data) => {
      setEmployee(data);
      form.setFieldsValue(data); // Populate the form with fetched data
    });
  }, [employeeId, form]);

  const submitAction = async (values) => {
    const data = { ...employee, ...values, _id: employeeId }; // Merge existing data with form values
    await updateEmployee(employeeId, data);
    setOpen(false);
    refreshEmployee(); // Refresh the employee details after updating
  };

  const handleOpen = async () => {
    try {
      const data = await fetchEmployee(employeeId);
      setEmployee(data);
      form.setFieldsValue(data);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleOpen}
            >
                Edit Employee
            </Button>
            <Modal
                open={open}
                title="Edit Employee"
                okText="Edit"
                cancelText="Cancel"
                okButtonProps={{ autoFocus: true, htmlType: "submit" }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form} // Pass the form instance here
                        name="Update Employee Modal"
                        onFinish={submitAction}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item 
                name="firstName" 
                label="First Name" 
                rules={[{ required: true }]}
                initialValue={employee.firstName}
                >
                    <Input />                                        
                </Form.Item>
                <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
                initialValue={employee.lastName}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="job"
                label="Job Title"
                rules={[{ required: true }]}
                initialValue={employee.job}
                >
                    <Input />
                </Form.Item>                  
                <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true }]}
                initialValue={employee.image}
                >
                    <Input />
                </Form.Item>
            </Modal>
        </>
    );
}