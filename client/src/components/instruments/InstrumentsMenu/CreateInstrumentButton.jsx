import { useState } from "react";

import { Button, Form, Input, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import InstrumentService from "../../../services/InstrumentService";

export default function CreateInstrumentButton({ reloadInstruments, resetStyles }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const submitAction = async (values) => {
        const data = { ...values };
        data.isOccupied = false; // Set isOccupied to false by default
        await InstrumentService.create(data);
        setOpen(false);
        reloadInstruments();
        resetStyles(); // Reset styles of other buttons
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
