import React from "react";

import { ExclamationCircleFilled } from "@ant-design/icons";

import { Button, Modal } from "antd";

import { useReturnInstrumentFromEmployee } from "../../api/instrumentsApi";
import { useDeleteInstrument } from "../../api/instrumentsApi";

export default function DeleteButton({ instrument, onDelete }) {
const { confirm } = Modal;
const { remove: deleteInstrument } = useDeleteInstrument();
const { returnInstrumentFromEmployee } = useReturnInstrumentFromEmployee();

const showConfirm = (instrument, onDelete) => {
  confirm({
    title: "Do you want to delete this instrument?",
    icon: <ExclamationCircleFilled />,
    onOk() {
      returnInstrumentFromEmployee(instrument.currentOwner, instrument._id);
      deleteInstrument(instrument._id).then(() => {
        onDelete(instrument._id); // Update the state in the parent component
      });
    },
    onCancel() {}
  });
};

  return (
    <Button
      color="danger"
      variant="solid"
      onClick={() => showConfirm(instrument, onDelete)}
    >
      Delete
    </Button>
  );
}
