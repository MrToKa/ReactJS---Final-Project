import { useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import InstrumentCard from './InstrumentsCard/InstrumentCard';
import InstrumentService from '../../services/InstrumentService';
import EmployeeService from '../../services/EmployeeService';

export default function Instruments() {
  const [instrument, setInstrument] = useState([]);
  const [owners, setOwners] = useState({}); // Cache for all employees

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

  useEffect(() => {
    refreshInstruments(); // Initial fetch of instruments
    fetchAllEmployees(); // Fetch all employees once
  }, []);

  return (
    <>
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