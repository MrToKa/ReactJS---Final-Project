import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDeleteProject } from "../../../api/projectApi";
import { useSetEmployeeFree } from "../../../api/employeesApi"; 
import { useEmployeesOnProjects } from "../../../api/employeesApi"; 

export default function DeleteProjectButton({ projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { remove } = useDeleteProject();
  const { setEmployeeFree } = useSetEmployeeFree(); 
  const { fetchEmployeesOnProjects: fetchEmployees } = useEmployeesOnProjects(); 

  const handleDelete = async () => {
    const employees = await fetchEmployees(); // Fetch all employees
    const employeePromises = employees.map(async (employee) => {
      if (employee.currentProject === projectId) {
        employee.currentProject = ""; // Set currentProject to "" for all employees assigned to the project
        await setEmployeeFree(employee._id); // Update the employee's currentProject field
      }
    });
    await Promise.all(employeePromises); // Wait for all employee updates to complete

    await remove(projectId); // Delete the project using the custom hook

    setIsModalOpen(false);
    navigate("/projects");
  };

  return (
    <>
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Delete Project
      </Button>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <Typography.Text>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </Typography.Text>
      </Modal>
    </>
  );
}
