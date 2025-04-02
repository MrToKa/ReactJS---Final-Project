import { useEffect, useState, useContext } from 'react';

import { Col, Row, Flex } from 'antd';

import InstrumentCard from './InstrumentsCard/InstrumentCard';
import InstrumentsMenu from './InstrumentsMenu/InstrumentsMenu';

import { UserContext } from "../contexts/userContext";
import { useEmployees } from '../api/employeesApi';
import { useInstruments } from '../api/instrumentsApi'; // Custom hook to fetch instruments
import { useGetFreeInstruments } from '../api/instrumentsApi';
import { useGetOccupiedInstruments } from '../api/instrumentsApi'; // Custom hook to fetch occupied instruments

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);
  const [owners, setOwners] = useState({});
  const [isShowingFree, setIsShowingFree] = useState(false); // Lifted state for free instruments
  const [isShowingOccupied, setIsShowingOccupied] = useState(false); // Lifted state for occupied instruments
  const { _id } = useContext(UserContext); // Get user ID from context

  const { instruments: allInstruments } = useInstruments(); // Custom hook to fetch instruments
  const { freeInstruments } = useGetFreeInstruments(); // Custom hook to fetch free instruments
  const { occupiedInstruments } = useGetOccupiedInstruments(); // Custom hook to fetch occupied instruments
  const { employees: fetchEmployees } = useEmployees(); // Custom hook to fetch employee details

  const refreshInstruments = async () => { // Mark function as async
    if (isShowingFree) {
      loadFreeInstruments(); // Reload free instruments if the "Show Free" filter is active
    } else if (isShowingOccupied) {
      loadOccupiedInstruments(); // Reload occupied instruments if the "Show Occupied" filter is active
    } else {
      try {
        const data = await allInstruments(); // Await the Promise to resolve
        setInstrument(data); // Reload all instruments if no filter is active
      } catch (error) {
        console.error("Error fetching all instruments:", error); // Error handling
      }
    }
  };

  const fetchAllEmployees = async () => {
    await fetchEmployees()
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

  const loadFreeInstruments = async () => {
    const data = await freeInstruments(); // Fetch free instruments
    processAndSetInstruments(data); // Process and set the state with free instruments

  }

  const loadOccupiedInstruments = async () => {
    const data = await occupiedInstruments(); // Fetch occupied instruments
    processAndSetInstruments(data); // Process and set the state with occupied instruments    
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
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
        {isShowingFree ? 'Free Instruments' : isShowingOccupied ? 'Occupied Instruments' : 'All Instruments'}
      </h2>
      <Flex wrap gap="small" justify="center" style={{ height: 'auto' }}>
        {Array.from(instrument.map((item) => (          
            <InstrumentCard
              key={item._id}
              instrument={item}
              owner={owners[item.currentOwner] || null}
              onDelete={refreshInstruments}
              onReturn={refreshInstruments} // Refresh instruments after returning
            />          
        )))}
      </Flex>
    </>
  );
};