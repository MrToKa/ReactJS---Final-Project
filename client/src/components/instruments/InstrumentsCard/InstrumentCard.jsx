import { Card, Space } from "antd";
import ReturnButton from "./ReturnButton";
import DeleteButton from "./DeleteButton";
import GiveButton from "./GiveButton";
import EditButton from "./EditButton";

const { Meta } = Card;

export default function InstrumentCard({ instrument, owner, onDelete, onReturn }) {
  const renderCard = () => (
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
        <strong>Current owner:</strong> {owner ? `${owner.firstName} ${owner.lastName}` : "Free"}
      </p>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        {owner ? (
          <ReturnButton instrument={instrument} owner={owner} onReturn={onReturn} />
        ) : (
          <GiveButton instrument={instrument} onReturn={onReturn} />
        )}
        <EditButton
          instrumentId={instrument._id}
          currentOwner={instrument.currentOwner}
          onReturn={onReturn}
        />
        <DeleteButton instrument={instrument} onDelete={onDelete} />
      </Space>
    </Card>
  );

  return renderCard(owner);
}
