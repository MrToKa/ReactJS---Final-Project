import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const InstrumentCard = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://www.powerbuilt.com/cdn/shop/products/640948-01.jpg?v=1658745639" />}
  >
    <Meta title="Instrument Type" description="www.instagram.com" />
  </Card>
);
export default InstrumentCard;