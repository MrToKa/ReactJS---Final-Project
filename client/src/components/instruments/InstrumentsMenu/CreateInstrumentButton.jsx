import { useState } from "react";

import { Button, Form, Input, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useCreateInstrument } from '../../api/instrumentsApi';

export default function CreateInstrumentButton({ reloadInstruments }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const { createInstrument } = useCreateInstrument(); // Custom hook to fetch instruments

    const submitAction = async (values) => {
        const data = { ...values };
        data.currentOwner = ""; // Set currentOwner to empty string
        await createInstrument(data); // Call the createInstrument function from the custom hook
        setOpen(false);
        reloadInstruments();
    };

    return (
        <>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>
                Create Instrument
            </Button>
            <Modal
                open={open}
                title="Create a new Instrument"
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{ autoFocus: true, htmlType: "submit" }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="Create New Instrument"
                        clearOnDestroy
                        onFinish={(values) => submitAction(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="name"
                    label="Instrument Name"
                    rules={[
                        {
                            required: true,
                            message: "Please fill in the name of the instrument!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="identityNumber"
                    label="ID"
                    rules={[
                        {
                            required: true,
                            message: "Please fill in the description of the instrument!",
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
