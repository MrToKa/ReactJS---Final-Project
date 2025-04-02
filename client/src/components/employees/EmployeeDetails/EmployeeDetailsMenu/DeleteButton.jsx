import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useInstruments, useUpdateInstrument } from "../../../api/instrumentsApi";
import { useDeleteEmployee } from "../../../api/employeesApi";

export default function DeleteButton({ employeeId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { instruments: fetchInstruments } = useInstruments(); // Fetch all instruments
    const { update: updateInstrument } = useUpdateInstrument(); // Fetch all instruments
    const { deleteEmployee } = useDeleteEmployee(); // Fetch all instruments

    const handleDelete = async () => {
        try {            
            const instruments = await fetchInstruments();
            const instrumentPromises = instruments.map(async (instrument) => {
                if (instrument.currentOwner === employeeId) {
                    instrument.currentOwner = "";

                    if (instrument._id) { // Ensure the instrument has a valid id
                        try {
                            await updateInstrument(instrument._id, instrument);
                        } catch (error) {
                            console.error(`Failed to update instrument with id ${instrument._id}:`, error);
                        }
                    } else {
                        console.error("Instrument is missing an id:", instrument);
                    }
                }
            });
            await Promise.all(instrumentPromises);
            // Delete the employee
            await deleteEmployee(employeeId);
            setIsModalOpen(false);
            navigate("/employees");
        } catch (error) {
            console.error("Failed to delete employee:", error);
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
                Delete Employee
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
                    Are you sure you want to delete this Employee? This action cannot be undone!
                </Typography.Text>
            </Modal>
        </>
    );
}