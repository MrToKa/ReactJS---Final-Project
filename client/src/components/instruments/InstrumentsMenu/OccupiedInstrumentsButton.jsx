import { Button } from 'antd';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import InstrumentService from "../../../services/InstrumentService";

export default function OccupiedInstrumentsButton({ isOccupiedActive, setIsOccupiedActive, resetStyles, processAndSetInstruments }) {
    const toggleOccupiedInstruments = async () => {
        const instruments = isOccupiedActive
            ? await InstrumentService.getAll() // Load all instruments
            : await InstrumentService.getOccupiedInstruments(); // Load occupied instruments
        processAndSetInstruments(instruments); // Update full list of instruments and recalculate paginated data
        setIsOccupiedActive(!isOccupiedActive); // Toggle state
    };

    return (
        <Button
        type="primary"
        icon={isOccupiedActive ? <UndoOutlined /> : <CheckOutlined />} // Toggle icon
        style={{
            backgroundColor: isOccupiedActive ? "red" : undefined, // Toggle color
            borderColor: isOccupiedActive ? "red" : undefined,
        }}
        onClick={() => {
            resetStyles(); // Reset styles of other buttons
            toggleOccupiedInstruments(); // Toggle instruments
        }}
        >
        {isOccupiedActive ? "Show all instruments" : "Show occupied instruments"} {/* Toggle text */}
        </Button>
    );
}