import { useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import InstrumentCard from './InstrumentsCard/InstrumentCard';
import InstrumentService from '../../services/InstrumentService';
import EmployeeService from '../../services/EmployeeService';
import InstrumentsMenu from './InstrumentsMenu/InstrumentsMenu';

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);
  const [owners, setOwners] = useState({});
  const [isShowingFree, setIsShowingFree] = useState(false); // Lifted state for free instruments
  const [isShowingOccupied, setIsShowingOccupied] = useState(false); // Lifted state for occupied instruments

  const refreshInstruments = () => {
    if (isShowingFree) {
      loadFreeInstruments(); // Reload free instruments if the "Show Free" filter is active
    } else if (isShowingOccupied) {
      loadOccupiedInstruments(); // Reload occupied instruments if the "Show Occupied" filter is active
    } else {
      InstrumentService.getAll()
        .then((data) => {
          setInstrument(data); // Reload all instruments if no filter is active
        })
        .catch((error) => {
          console.error('Error refreshing instruments:', error);
        });
    }
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

  return (
    <>
      <InstrumentsMenu
        refreshInstruments={refreshInstruments}
        isShowingFree={isShowingFree} // Pass state for free instruments
        setIsShowingFree={setIsShowingFree} // Pass setter for free instruments
        isShowingOccupied={isShowingOccupied} // Pass state for occupied instruments
        setIsShowingOccupied={setIsShowingOccupied} // Pass setter for occupied instruments
        processAndSetInstruments={processAndSetInstruments}
      />
      <Row gutter={24} justify="center" style={{ height: 'auto' }}>
        {instrument.map((item, index) => (
          <Col span={6} key={item.id || `instrument-${index}`}>
            <InstrumentCard
              instrument={item}
              owner={owners[item.currentOwner] || null}
              onDelete={refreshInstruments}
              onReturn={refreshInstruments} // Refresh instruments after returning
            />
          </Col>
        ))}
      </Row>
    </>
  );
};