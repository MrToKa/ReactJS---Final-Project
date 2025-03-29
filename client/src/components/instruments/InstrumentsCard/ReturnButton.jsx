import { Button } from "antd";

import EmployeeService from "../../../services/EmployeeService";

export default function ReturnButton({ instrument, owner, onReturn }) {
  return (
    <Button
      type="primary"
      onClick={() => {
        if (instrument.currentOwner) {
          if (owner && owner._id) {
            EmployeeService.returnInstrumentFromEmployee(owner._id, instrument._id).then(() => {
              onReturn(); // Refresh the instruments list
            });
          } else {
            console.error("Owner ID is not available");
          }
        }
      }}
    >
      Return to warehouse
    </Button>
  );
}
