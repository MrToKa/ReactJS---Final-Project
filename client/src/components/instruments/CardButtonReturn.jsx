import { Button } from "antd";

import { useState } from "react";

import EmployeeService from "../../services/EmployeeService";
import InstrumentService from "../../services/InstrumentService";

export default function InstrumentCardButton({ instrument }) {
  const buttonText = instrument.currentOwner
    ? "Return to warehouse"
    : "Give to worker";

  const [owner, setOwner] = useState([]);

  const instrumnetOwner = (ownerId) => {
    EmployeeService.getById(ownerId)
      .then((response) => {
        if (response && typeof response === "object") {
          setOwner(response);
        } else {
          console.error("Invalid response format:", response);
          setOwner({});
        }
      })
      .catch((error) => {
        console.error("Error fetching owner:", error);
        setOwner({});
      });
  };

  return (
    <Button
      type="primary"
      onClick={() => {
        if (instrument.currentOwner) {
          InstrumentService.returnInstrument(instrument.id).then(() => {
            console.log("Instrument returned to warehouse");
          });
        } else {
          InstrumentService.giveToWorker(instrument.id, owner.id).then(() => {
            console.log("Instrument given to worker");
          });
        }
      }}
    >
      {buttonText}
    </Button>
  );
}
