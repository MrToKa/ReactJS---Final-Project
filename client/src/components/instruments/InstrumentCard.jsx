import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Card, Space } from "antd";
import EmployeeService from "../../services/EmployeeService";
import CardButtonReturn from "./CardButtonReturn";
import CardButtonDelete from "./CardButtonDelete";

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

  const renderCard = (ownerInfo) => (
    <Card
      style={{
        width: 400,
        height: 440,
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
      <Meta title={instrument.name} />
      <p style={{ marginTop: "10px" }}>
        <strong>ID:</strong> {instrument.identityNumber}
      </p>
      <p style={{ marginTop: "10px" }}>
        <strong>Current owner:</strong> {ownerInfo}
      </p>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <CardButtonReturn instrument={instrument} />
        <CardButtonDelete instrument={instrument} />
      </Space>
    </Card>
  );

  return owner._id
    ? renderCard(`${owner.firstName} ${owner.lastName}`)
    : renderCard("Free");
}
