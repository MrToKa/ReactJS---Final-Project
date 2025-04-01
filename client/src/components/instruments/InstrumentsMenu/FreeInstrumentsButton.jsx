import { Button } from 'antd';

import { HddOutlined, UndoOutlined } from '@ant-design/icons';
import { useGetFreeInstruments } from '../../api/instrumentsApi';
import { useInstruments } from '../../api/instrumentsApi'; // Custom hook to fetch instruments

export default function FreeInstrumentsButton({ isFreeActive, setIsFreeActive, resetStyles, processAndSetInstruments }) {
    const { freeInstruments } = useGetFreeInstruments(); // Custom hook to fetch free instruments
    const { instruments: allInstruments } = useInstruments(); // Custom hook to fetch all instruments

    const toggleFreeInstruments = async () => {
        const instruments = isFreeActive
            ? await allInstruments() // Load all instruments
            : await freeInstruments(); // Load free instruments
        processAndSetInstruments(instruments); // Update full list of instruments and recalculate paginated data
        setIsFreeActive(!isFreeActive); // Toggle state
    };
    
    return (
        <Button
        type="primary"
        icon={isFreeActive ? <UndoOutlined /> : <HddOutlined />} // Toggle icon
        style={{
            backgroundColor: isFreeActive ? "red" : undefined, // Toggle color
            borderColor: isFreeActive ? "red" : undefined,
        }}
        onClick={() => {
            resetStyles(); // Reset styles of other buttons
            toggleFreeInstruments(); // Toggle instruments
        }}
        >
        {isFreeActive ? "Show all instruments" : "Show free instruments"} {/* Toggle text */}
        </Button>
    );
}
