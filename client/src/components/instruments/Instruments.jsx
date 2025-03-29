import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import InstrumentCard from './InstrumentCard';
import InstrumentService from '../../services/InstrumentService';

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);

  useEffect(() => {
    InstrumentService.getAll()
      .then((data) => {
        setInstrument(data);
      })
      .catch((error) => {
        console.error('Error fetching instruments:', error);
      });
  }, []);

  const handleDelete = () => {
    InstrumentService.getAll()
      .then((data) => {
        setInstrument(data); // Refresh the instruments list directly from the server
      })
      .catch((error) => {
        console.error('Error refreshing instruments:', error);
      });
  };

  return (
    <>
      <Row gutter={24} justify="center" style={{ height: 'auto' }}>
        {instrument.map((item, index) => (
          <Col span={6} key={item.id || `instrument-${index}`}>
            <InstrumentCard instrument={item} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>
    </>
  );
};