import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import InstrumentCard from './InstrumentCard';

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setInstrument(data));
  }, []);

  return (
    <>
      <Row gutter={24} justify="center" style={{ height: 'auto' }}>
        {instrument.map((item) => (
          <Col span={6} key={item.id}>
            <InstrumentCard instrument={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};