import { useState, useEffect } from "react";

import { Button, Form, Input, Modal } from "antd";

import { useInstrument } from "../../api/instrumentsApi";
import { useUpdateInstrument } from "../../api/instrumentsApi";

export default function EditButton({ instrumentId, currentOwner, onReturn }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [instrument, setInstrument] = useState({});

  const { instrument: fetchInstrument } = useInstrument(); // Custom hook to fetch instrument details
  const { update: updateInstrument } = useUpdateInstrument(); // Custom hook to update instrument details


  useEffect(() => {
    // Fetch instrument data and set it to state
    fetchInstrument(instrumentId).then((data) => {
      setInstrument(data);
      form.setFieldsValue(data); // Populate the form with fetched data
    });
  }, [instrumentId, form]);

  const submitAction = async (values) => {
    const data = { ...values, _id: instrumentId, currentOwner }; // Include currentOwner in the data
    await updateInstrument(instrumentId, data);
    setOpen(false);
    onReturn(); // Refresh the instrument details after updating
  };

  const handleOpen = async () => {
    try {
      const data = await fetchInstrument(instrumentId);
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
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()} // manually trigger submit from modal
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          name="Update Instrument Modal"
          onFinish={submitAction}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter instrument name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="identityNumber"
            label="Identity Number"
            rules={[{ required: true, message: "Please enter identity number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
