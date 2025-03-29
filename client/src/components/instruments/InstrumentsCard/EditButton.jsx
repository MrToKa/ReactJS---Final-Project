import { useState, useEffect } from "react";

import { Button, Form, Input, Modal } from "antd";

import InstrumentService from "../../../services/InstrumentService";

export default function EditButton({ instrumentId, currentOwner, onReturn }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [instrument, setInstrument] = useState({});

  useEffect(() => {
    // Fetch instrument data and set it to state
    InstrumentService.getById(instrumentId).then((data) => {
      setInstrument(data);
      form.setFieldsValue(data); // Populate the form with fetched data
    });
  }, [instrumentId, form]);

  const submitAction = async (values) => {
    const data = { ...values, _id: instrumentId, currentOwner }; // Include currentOwner in the data
    await InstrumentService.update(instrumentId, data);
    setOpen(false);
    onReturn(); // Refresh the instrument details after updating
  };

  const handleOpen = async () => {
    try {
      const data = await InstrumentService.getById(instrumentId);
      setInstrument(data);
      form.setFieldsValue(data);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button color="green" variant="solid" onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        open={open}
        title="Edit Instrument"
        okText="Edit"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form} // Pass the form instance here
            name="Update Instrument Modal"
            onFinish={submitAction}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
          initialValue={instrument.name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="identityNumber"
          label="Identity Number"
          rules={[{ required: true }]}
          initialValue={instrument.identityNumber}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true }]}
          initialValue={instrument.image}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
}
