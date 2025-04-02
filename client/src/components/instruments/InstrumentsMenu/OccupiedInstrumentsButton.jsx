import { Button } from 'antd';

import { ToolOutlined, UndoOutlined } from '@ant-design/icons';

import { useGetOccupiedInstruments } from '../../api/instrumentsApi';
import { useInstruments } from '../../api/instrumentsApi'; // Custom hook to fetch instruments

export default function OccupiedInstrumentsButton({ isOccupiedActive, setIsOccupiedActive, resetStyles, processAndSetInstruments }) {

    const { occupiedInstruments } = useGetOccupiedInstruments(); // Custom hook to fetch occupied instruments
    const { instruments: allInstruments } = useInstruments(); // Custom hook to fetch all instruments

    const toggleOccupiedInstruments = async () => {
        if (isOccupiedActive) {
            await allInstruments().then(processAndSetInstruments); // Load all instruments
        } else {
            await occupiedInstruments().then(processAndSetInstruments); // Load occupied instruments
        }
        setIsOccupiedActive(!isOccupiedActive); // Toggle state
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