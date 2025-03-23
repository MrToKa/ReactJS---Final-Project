import { Card } from "antd";
import { Link } from "react-router";

const { Meta } = Card;

export default function InstrumentCard({ instrument }) {
  
  return (
    <Link key={instrument.id} to={`/instruments/${instrument.id}`}>
      <Card
        hoverable
        style={{
          width: 240,
        }}

        cover={<img alt={instrument.title} src={instrument.image} />}
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
