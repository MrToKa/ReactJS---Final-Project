import { Button } from "antd";

import { useReturnInstrumentFromEmployee } from "../../api/instrumentsApi";

export default function ReturnButton({ instrument, owner, onReturn }) {
  const { returnInstrumentFromEmployee } = useReturnInstrumentFromEmployee(); 

  return (
    <Button
      type="primary"
      onClick={() => {
        if (instrument.currentOwner) {
          if (owner && owner._id) {
            returnInstrumentFromEmployee(owner._id, instrument._id).then(() => {
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
