import { Button, Modal, Radio, message } from "antd";
import { useState } from "react";

import EmployeeService from "../../../services/EmployeeService";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

export default function GiveButton({ instrument, onReturn }) {
  const [employeesList, setEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    setValue(e.target.value);
    setSelectedEmployee(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
    EmployeeService.getAll()
      .then((response) => {
        if (response && Array.isArray(response)) {
          setEmployeesList(response);
        } else {
          console.error("Invalid response format:", response);
          setEmployeesList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setEmployeesList([]);
      });
  };

  const handleOk = () => {
    if (selectedEmployee) {
      EmployeeService.setInstrumentToEmployee(
        selectedEmployee,
        instrument._id
      ).then(() => {
        onReturn(); // Refresh the filtered list
      });
      setEmployeesList([]);
      setIsModalOpen(false);
    } else {
      message.error("You must pick a new owner for the instrument"); // Display error message
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Give to worker
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group onChange={onChange} value={value}>
          <div style={style}>
            {employeesList.map((employee) => (
              <Radio key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </Radio>
            ))}
          </div>
        </Radio.Group>
      </Modal>
    </>
  );
}
