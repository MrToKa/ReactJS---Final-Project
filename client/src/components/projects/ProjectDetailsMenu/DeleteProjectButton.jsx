import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import ProjectService from "../../../services/projectService";
import EmployeeService from "../../../services/employeeService";

export default function DeleteProjectButton({ projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            // Set currentProject to "" for all employees assigned to the project
            const employees = await EmployeeService.getAll();
            const employeePromises = employees.map(async (employee) => {
                if (employee.currentProject === projectId) {
                    employee.currentProject = "";

                    if (employee._id) { // Ensure the employee has a valid id
                        try {
                            await EmployeeService.update(employee._id, employee);
                        } catch (error) {
                            console.error(`Failed to update employee with id ${employee._id}:`, error);
                        }
                    } else {
                        console.error("Employee is missing an id:", employee);
                    }
                }
            });
            await Promise.all(employeePromises);

            // Delete the project
            await ProjectService.delete(projectId);
            setIsModalOpen(false);
            navigate("/projects");
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
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
                    Are you sure you want to delete this project? This action cannot be undone.
                </Typography.Text>
            </Modal>
        </>
    );
}