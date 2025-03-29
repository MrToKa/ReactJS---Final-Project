import { useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import InstrumentCard from './InstrumentsCard/InstrumentCard';
import InstrumentService from '../../services/InstrumentService';
import EmployeeService from '../../services/EmployeeService';
import InstrumentsMenu from './InstrumentsMenu/InstrumentsMenu';

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);
  const [owners, setOwners] = useState({}); // Cache for all employees
  const [isSowingFree, setIsSowingFree] = useState(false); // State to manage free instruments
  const [isShowingOccupied, setIsShowingOccupied] = useState(false); // State to manage occupied instruments
  
  const refreshInstruments = () => {
    InstrumentService.getAll()
      .then((data) => {
        setInstrument(data); // Refresh the instruments list
      })
      .catch((error) => {
        console.error('Error refreshing instruments:', error);
      });
  };

  const fetchAllEmployees = () => {
    EmployeeService.getAll()
      .then((response) => {
        if (response && Array.isArray(response)) {
          const employeesMap = response.reduce((acc, employee) => {
            acc[employee._id] = employee;
            return acc;
          }, {});
          setOwners(employeesMap); // Cache all employees
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const processAndSetInstruments = (data) => {
    const instrumentsMap = data.reduce((acc, instrument) => {
      acc[instrument._id] = instrument;
      return acc;
    }, {});
    setInstrument(Object.values(instrumentsMap)); // Update the state with the processed instruments as an array
  }

  useEffect(() => {
    refreshInstruments(); // Initial fetch of instruments
    fetchAllEmployees(); // Fetch all employees once
  }, []);

  const loadFreeInstruments = () => {
    InstrumentService.getFreeInstruments()
      .then((data) => {
        setInstrument(data); // Load free instruments
      })
      .catch((error) => {
        console.error('Error loading free instruments:', error);
      });
  }

  const loadOccupiedInstruments = () => {
    InstrumentService.getOccupiedInstruments()
      .then((data) => {
        setInstrument(data); // Load occupied instruments
      })
      .catch((error) => {
        console.error('Error loading occupied instruments:', error);
      });
  }

  const toggleFreeInstruments = () => {
    if (isSowingFree) {
      refreshInstruments(); // Load all instruments
    } else {
      loadFreeInstruments(); // Load free instruments      
    }
    setIsSowingFree(!isSowingFree); // Toggle state
  }

  const toggleOccupiedInstruments = () => {
    if (isShowingOccupied) {
      refreshInstruments(); // Load all instruments
    } else {
      loadOccupiedInstruments(); // Load occupied instruments
    }
    setIsShowingOccupied(!isShowingOccupied); // Toggle state
  }

  return (
    <>
    <InstrumentsMenu 
    refreshInstruments={refreshInstruments} 
    toggleFreeInstruments={toggleFreeInstruments}
    toggleOccupiedInstruments={toggleOccupiedInstruments}
    isSowingFree={isSowingFree} // Pass the state of free instruments
    isShowingOccupied={isShowingOccupied} // Pass the state of occupied instruments
    processAndSetInstruments={processAndSetInstruments}
    />
      <Row gutter={24} justify="center" style={{ height: 'auto' }}>
        {instrument.map((item, index) => (
          <Col span={6} key={item.id || `instrument-${index}`}>
            <InstrumentCard
              instrument={item}
              owner={owners[item.currentOwner] || null} // Pass cached owner data
              onDelete={refreshInstruments}
              onReturn={refreshInstruments}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};