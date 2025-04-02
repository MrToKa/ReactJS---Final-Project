import { useState, useEffect } from "react";

import { Button, Form, Input, Modal, Radio } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { useUpdateProject, useProject } from "../../../api/projectApi";
import { useSetEmployeeFree, useEmployeesOnProjects } from "../../../api/employeesApi";

export default function EditProjectButton({ projectId, refreshProject }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState({});
  const { setEmployeeFree } = useSetEmployeeFree(); // Use the custom hook to set an employee free
  const { fetchEmployeesOnProjects: employeesOnProject } = useEmployeesOnProjects(); // Fetch employees on the project using the custom hook

  const { update } = useUpdateProject(); // Use the custom hook to update a project
  const { project: fetchProject } = useProject(); // Fetch project data using the custom hook

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const data = await fetchProject(projectId);
        setProject(data);
        form.setFieldsValue(data); // Set form values when project data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
    
  }, [projectId, form]); // Fetch project data when projectId changes

  const submitAction = async (values) => {
    const data = { ...values, _id: projectId }; // Include the id in the data
    await update(projectId, data); // Pass the project object with _id
    const employeesOnCurrentProject = await employeesOnProject(projectId); // Fetch employees on the project

    console.log("Employees on current project:", employeesOnCurrentProject); // Debugging log
    console.log("Project ID:", projectId); // Debugging log

    if (data.status === "Completed" && employeesOnCurrentProject.length > 0) {
      console.log("Setting employees free:", employeesOnCurrentProject);
      for (const employee of employeesOnCurrentProject) {
        console.log("Employee ID:", employee._id); // Debugging log
        await setEmployeeFree(employee._id); // Access the _id property of each employee
      }   
    }

    setOpen(false);
    refreshProject(); // Refresh the project details after updating
  };

  const handleOpen = async () => {
    try {
      const data = await fetchProject(projectId); // Fetch project data when opening the modal
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
            <Radio value="Ongoing">Ongoing</Radio>
            <Radio value="Completed">Completed</Radio>
            <Radio value="Future">Future</Radio>
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
