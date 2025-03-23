import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Card, Flex, Typography } from 'antd';
import InstrumentsTable from './InstrumentDetailsTable';

const imgStyle = {
  display: 'block',
  width: 200,
  height: 300,
  objectFit: 'cover',
  padding: 0,
};

export default function InstrumentItem() {
  const {instrumentId} = useParams();
  const [instrument, setInstrument] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${instrumentId}`)
      .then((response) => response.json())
      .then((data) => setInstrument(data));
  }, [instrumentId]);

  return (
  <>
  <Card
    styles={{
      body: {
        padding: 0,
        overflow: 'hidden',
      },
    }}
  >
    <Flex justify="space-between">
      <img
        alt={instrument.title}
        src={instrument.image}
        style={imgStyle}
      />
      <Flex
        vertical
        align="flex-end"
        justify="space-between"
        style={{
          padding: 32,
        }}
      >
        <Typography.Title level={3}>
          {instrument.title}
        </Typography.Title>
        <Typography.Text>
          {instrument.description}
        </Typography.Text>        
      </Flex>
    </Flex>
  </Card> 

  <InstrumentsTable />
  </>
);
};
