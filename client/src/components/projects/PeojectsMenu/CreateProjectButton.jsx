import { useState } from "react";

import { Button, Form, Input, Modal, Radio } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useCreateProject } from "../../api/projectApi"; // Import the custom hook

export default function CreateProjectButton({ reloadProjects, resetStyles }) { // Accept resetStyles as a prop
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { create } = useCreateProject(); // Use the custom hook to create a project

  const submitAction = async (values) => {
    const data = { ...values };
    // await ProjectService.create(data);
    await create(data); // Use the custom hook to create a project
    setOpen(false);
    reloadProjects();
    resetStyles(); // Reset styles of other buttons
  };

  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>
        Create Project
      </Button>
      <Modal
        open={open}
        title="Create a new Project"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="Create Project Modal"
            clearOnDestroy
            onFinish={(values) => submitAction(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Please fill in the name of the project!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: "Please fill in the location of the project!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please select the status of the project!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="Ongoing">Ongoing</Radio>
            <Radio value="Completed">Completed</Radio>
            <Radio value="Future">Future</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="image" label="Image URL">
          <Input />
        </Form.Item>
        <Form.Item name="startDate" label="Start Date">
          <Input type="date" />
        </Form.Item>
        <Form.Item name="endDate" label="End Date">
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please fill in the description of the project!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Modal>
    </>
  );
}
