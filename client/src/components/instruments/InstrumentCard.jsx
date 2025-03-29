import { useEffect, useState } from "react";

import { Card } from "antd";
import EmployeeService from "../../services/EmployeeService";

const { Meta } = Card;

export default function InstrumentCard({ instrument }) {
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

  useEffect(() => {
    if (instrument.currentOwner) {
      instrumnetOwner(instrument.currentOwner);
    }
  }, [instrument.currentOwner]);

  return (    
      <Card
        hoverable
        style={{
          width: 400,
          height: 405,
          margin: "20px",
        }}
        cover={
          <div
            style={{
              width: 398,
              height: 250,
              overflow: "hidden",
              border: "1px solid #f0f0f0",
            }}
          >
            <img
              alt={instrument.name}
              src={instrument.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        }
      >
        <Meta
          title={instrument.name}      
        />
        <p style={{ marginTop: "10px" }}>
          <strong>ID:</strong> {instrument.identityNumber}
        </p>
        <p style={{ marginTop: "10px" }}>
          <strong>Current owner:</strong> {owner.firstName} {owner.lastName}
        </p>
      </Card>   
  );
}
