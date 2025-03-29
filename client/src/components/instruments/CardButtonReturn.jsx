import { Button } from "antd";
import { useEffect, useState } from "react";

import EmployeeService from "../../services/EmployeeService";

export default function CardButtonReturn({ instrument, onReturn }) {

  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (instrument.currentOwner) {
      EmployeeService.getById(instrument.currentOwner)
        .then((response) => {
          if (response && typeof response === "object") {
            setOwner(response);
          } else {
            console.error("Invalid response format:", response);
            setOwner(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching owner:", error);
          setOwner(null);
        });
    }
  }, [instrument.currentOwner]);

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
