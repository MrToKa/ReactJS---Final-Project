import { Card } from "antd";
import { Link } from "react-router";

const { Meta } = Card;

export default function InstrumentCard({ instrument }) {
  return (
    <Link key={instrument.id} to={`/instruments/${instrument.id}`}>
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
              alt={instrument.title}
              src={instrument.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        }
        href={`/instruments/${instrument.id}`}
      >
        <Meta
          title={instrument.title}
          description={
            instrument.description.length > 100
              ? `${instrument.description.substring(0, 100)}...`
              : instrument.description
          }
        />
      </Card>
    </Link>
  );
}
