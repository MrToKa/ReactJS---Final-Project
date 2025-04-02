import { useState } from "react";
import { Button, Modal, Radio, message } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import { useOngoingProjects } from "../../../api/projectApi";
import { useSetEmployeeOnProject } from "../../../api/employeesApi";

export default function AssignProjectButton({ employeeId, refreshEmployee }) {
    const [projectsList, setProjectsList] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState(null);

    const { ongoingProjects } = useOngoingProjects(); // Fetch all ongoing projects
    const { setEmployeeOnProject } = useSetEmployeeOnProject(); // Fetch all instruments

    const onChange = (e) => {
        setValue(e.target.value);
        setSelectedProject(e.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
        ongoingProjects()
            .then((response) => {
                if (response && Array.isArray(response)) {
                    setProjectsList(response);
                } else {
                    console.error("Invalid response format:", response);
                    setProjectsList([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setProjectsList([]);
            });
    };

    const handleOk = () => {
        if (selectedProject) {
            setEmployeeOnProject(employeeId, selectedProject)
                .then(() => {
                    setProjectsList([]); // Clear the project list
                    setIsModalOpen(false); // Close the modal
                    refreshEmployee(); // Refresh employee details and tabs
                })
                .catch((error) => {
                    console.error("Error assigning project:", error);
                });
        } else {
            message.error("You must pick a project for the employee"); // Display error message
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                type="primary"
                icon={<GlobalOutlined />}
                onClick={showModal}
            >
                Assign to project
            </Button>
            <Modal
                title="Assign Project"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {projectsList.map((project) => (
                            <Radio key={project._id} value={project._id}>
                                {project.name}
                            </Radio>
                        ))}
                    </div>
                </Radio.Group>
            </Modal>
        </>
    );
}