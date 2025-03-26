import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import ProjectService from "../../../services/ProjectService";


export default function DeleteProjectButton({ projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
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