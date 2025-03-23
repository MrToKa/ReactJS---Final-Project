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
  <Row gutter={12} justify="center">
    {instrument.map((item) => (
      <Col span={4} key={item.id}>
        <InstrumentCard instrument={item} /> {/* Pass the individual item */}
      </Col>
    ))}
  </Row>
);};