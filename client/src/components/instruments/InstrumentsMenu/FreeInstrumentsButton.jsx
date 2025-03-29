import { Button } from 'antd';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import InstrumentService from "../../../services/InstrumentService";

export default function FreeInstrumentsButton({ isFreeActive, setIsFreeActive, resetStyles, processAndSetInstruments }) {
    const toggleFreeInstruments = async () => {
        const instruments = isFreeActive
            ? await InstrumentService.getAll() // Load all instruments
            : await InstrumentService.getFreeInstruments(); // Load free instruments
        processAndSetInstruments(instruments); // Update full list of instruments and recalculate paginated data
        setIsFreeActive(!isFreeActive); // Toggle state
    };
    
    return (
        <Button
        type="primary"
        icon={isFreeActive ? <UndoOutlined /> : <CheckOutlined />} // Toggle icon
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
