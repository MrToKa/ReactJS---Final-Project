import { useState, useEffect } from "react";

import { Button, Form, Input, Modal, Radio, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ProjectService from "../../../services/ProjectService";

export default function EditProjectButton({ projectId, refreshProject }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState({});

  useEffect(() => {
    // Fetch project data and set it to state
    ProjectService.getById(projectId).then((data) => {
      setProject(data);
      form.setFieldsValue(data); // Populate the form with fetched data
    });
  }, [projectId, form]);

  const submitAction = async (values) => {
    const data = { ...values, _id: projectId }; // Include the id in the data
    await ProjectService.update(projectId, data);
    setOpen(false);
    refreshProject(); // Refresh the project details after updating
  };

  const handleOpen = async () => {
    try {
      const data = await ProjectService.getById(projectId);
      setProject(data);
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
        Edit Project
      </Button>
      <Modal
        open={open}
        title="Edit Project"
        okText="Edit"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form} // Pass the form instance here
            name="Update Project Modal"
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
          initialValue={project.name}
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
          initialValue={project.location}
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
          initialValue={project.status}
        >
          <Radio.Group>
            <Radio value="ongoing">Ongoing</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="future">Future</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="image" label="Image URL" initialValue={project.image}>
          <Input />
        </Form.Item>
        <Form.Item name="startDate" label="Start Date" initialValue={project.startDate}>
          <Input type="date" />
        </Form.Item>
        <Form.Item name="endDate" label="End Date " initialValue={project.endDate}>
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
          initialValue={project.description}
        >
          <Input.TextArea />
        </Form.Item>
      </Modal>
    </>
  );
}
