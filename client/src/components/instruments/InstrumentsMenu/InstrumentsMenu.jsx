import React, { useState } from 'react';

import { Card, Flex } from 'antd';

import OccupiedInstrumentsButton from './OccupiedInstrumentsButton';
import CreateInstrumentButton from './CreateInstrumentButton';
import FreeInstrumentsButton from './FreeInstrumentsButton';

export default function InstrumentsMenu({ reloadInstruments, setInstruments, processAndSetInstruments }) {
    const [isFreeInstruments, setFreeInstruments] = useState(false); // Track "free employees" button state
    const [isShowingOccupied, setIsShowingOccupied] = useState(false); // State to manage showing occupied instruments

    const resetStyles = () => {
      setIsShowingOccupied(false); // Reset occupied instruments state
        setFreeInstruments(false); // Reset free instruments state
    }

  return (
    <Card> 
        <Flex wrap gap="large" justify="center">
          <CreateInstrumentButton reloadInstruments={reloadInstruments} resetStyles={resetStyles} />
          <OccupiedInstrumentsButton 
            instruments={setInstruments} // Pass occupied instruments to the component
            isOccupiedActive={isShowingOccupied} // Pass state to manage occupied instruments
            setIsOccupiedActive={setIsShowingOccupied} // Pass setter function to update occupied instruments state
            resetStyles={resetStyles} // Pass reset function to reset styles
            processAndSetInstruments={processAndSetInstruments} // Pass processAndSetInstruments function
          />
          <FreeInstrumentsButton
            instruments={setInstruments} // Pass setter function to update instruments
            isFreeActive={isFreeInstruments} // Pass state to manage free instruments
            setIsFreeActive={setFreeInstruments} // Pass setter function to update free instruments state
            resetStyles={resetStyles} // Pass reset function to reset styles
            processAndSetInstruments={processAndSetInstruments} // Pass processAndSetInstruments function
            />        
      </Flex>
    </Card>
  );
}
