import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import InstrumentCard from './InstrumentsCard/InstrumentCard';
import InstrumentService from '../../services/InstrumentService';

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);

  const refreshInstruments = () => {
    InstrumentService.getAll()
      .then((data) => {
        setInstrument(data); // Refresh the instruments list
      })
      .catch((error) => {
        console.error('Error refreshing instruments:', error);
      });
  };

  useEffect(() => {
    refreshInstruments(); // Initial fetch of instruments
  }, []);

  return (
    <>
      <Row gutter={24} justify="center" style={{ height: 'auto' }}>
        {instrument.map((item, index) => (
          <Col span={6} key={item.id || `instrument-${index}`}>
            <InstrumentCard instrument={item} onDelete={refreshInstruments} onReturn={refreshInstruments} />
          </Col>
        ))}
      </Row>
    </>
  );
};