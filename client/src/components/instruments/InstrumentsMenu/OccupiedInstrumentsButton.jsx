import { Button } from 'antd';

import { ToolOutlined, UndoOutlined } from '@ant-design/icons';
import InstrumentService from "../../../services/InstrumentService";

export default function OccupiedInstrumentsButton({ isOccupiedActive, setIsOccupiedActive, resetStyles, processAndSetInstruments }) {
    const toggleOccupiedInstruments = async () => {
        const instruments = isOccupiedActive
            ? await InstrumentService.getAll()
            : await InstrumentService.getOccupiedInstruments();
        processAndSetInstruments(instruments);
        setIsOccupiedActive(!isOccupiedActive); // Toggle active state
    };

    return (
        <Button
            type="primary"
            icon={isOccupiedActive ? <UndoOutlined /> : <ToolOutlined />}
            style={{
                backgroundColor: isOccupiedActive ? "red" : undefined,
                borderColor: isOccupiedActive ? "red" : undefined,
            }}
            onClick={() => {
                resetStyles();
                toggleOccupiedInstruments();
            }}
        >
            {isOccupiedActive ? "Show all instruments" : "Show occupied instruments"}
        </Button>
    );
}