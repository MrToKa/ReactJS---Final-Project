import React from "react";

import { ExclamationCircleFilled } from "@ant-design/icons";

import { Button, Modal } from "antd";
import EmployeeService from "../../../services/EmployeeService";
import InstrumentService from "../../../services/InstrumentService";

const { confirm } = Modal;

const showConfirm = (instrument, onDelete) => {
  confirm({
    title: "Do you want to delete this instrument?",
    icon: <ExclamationCircleFilled />,
    onOk() {
      EmployeeService.returnInstrumentFromEmployee(instrument.currentOwner, instrument._id);
      InstrumentService.delete(instrument._id).then(() => {
        onDelete(instrument._id); // Update the state in the parent component
      });
    },
    onCancel() {}
  });
};

export default function DeleteButton({ instrument, onDelete }) {
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
