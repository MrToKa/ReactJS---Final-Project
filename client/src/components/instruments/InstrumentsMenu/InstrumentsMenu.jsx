import React from 'react';

import { Card, Flex } from 'antd';

import OccupiedInstrumentsButton from './OccupiedInstrumentsButton';
import CreateInstrumentButton from './CreateInstrumentButton';
import FreeInstrumentsButton from './FreeInstrumentsButton';

export default function InstrumentsMenu({
  refreshInstruments,
  isShowingFree,
  setIsShowingFree,
  isShowingOccupied,
  setIsShowingOccupied,
  processAndSetInstruments,
}) {
  const resetStyles = () => {
    setIsShowingOccupied(false); // Reset occupied instruments state
    setIsShowingFree(false); // Reset free instruments state
  };

  return (
    <Card>
      <Flex wrap gap="large" justify="center">
        <CreateInstrumentButton reloadInstruments={refreshInstruments} resetStyles={resetStyles} />
        <OccupiedInstrumentsButton
          isOccupiedActive={isShowingOccupied} // Use state passed from Instruments.jsx
          setIsOccupiedActive={setIsShowingOccupied} // Use setter passed from Instruments.jsx
          resetStyles={resetStyles}
          processAndSetInstruments={processAndSetInstruments}
        />
        <FreeInstrumentsButton
          isFreeActive={isShowingFree} // Use state passed from Instruments.jsx
          setIsFreeActive={setIsShowingFree} // Use setter passed from Instruments.jsx
          resetStyles={resetStyles}
          processAndSetInstruments={processAndSetInstruments}
        />
      </Flex>
    </Card>
  );
}
