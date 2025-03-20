import React from 'react';

import { Col, Row } from 'antd';
import InstrumentCard from './InstrumentCard';

const Instruments = () => (
  <Row gutter={12} justify="center">
    <Col span={4}>
      <InstrumentCard />
    </Col>
    <Col span={4}>
      <InstrumentCard />
    </Col>
    <Col span={4}>
      <InstrumentCard />
    </Col>
    <Col span={4}>
      <InstrumentCard />
    </Col>
  </Row>
);

export default Instruments;