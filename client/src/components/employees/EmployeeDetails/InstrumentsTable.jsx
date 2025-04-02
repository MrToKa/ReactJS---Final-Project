import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Table } from 'antd';

import { useGetInstrumentsByEmployeeId, useReturnInstrumentFromEmployee } from '../../api/instrumentsApi';

const InstrumentsTable = ({ refreshKey }) => {
  const { employeeId } = useParams();
  const { getInstrumentsByEmployeeId } = useGetInstrumentsByEmployeeId(); // Fetch instruments by employee ID  
  const { returnInstrumentFromEmployee } = useReturnInstrumentFromEmployee(); // Fetch instruments by employee ID

  const [employeeInstruments, setEmployeeInstruments] = useState([]);

  const loadEmployeeInstruments = async () => {
    const allInstruments = await getInstrumentsByEmployeeId(employeeId); // Fetch all instruments

    const matchedInstruments = allInstruments.filter((inst) =>
      inst.currentOwner === employeeId
    );

    setEmployeeInstruments(matchedInstruments);
  };

  const handleReturnInstrument = async (instrumentId) => {
    await returnInstrumentFromEmployee(employeeId, instrumentId);
    loadEmployeeInstruments();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'identityNumber',
      key: 'identityNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span
          style={{ color: '#007BFF', cursor: 'pointer' }}
          onClick={() => handleReturnInstrument(record._id)}
        >
          Return to warehouse
        </span>
      ),
    },
  ];

  useEffect(() => {
    loadEmployeeInstruments(); // Run on refreshKey change
  }
  , [refreshKey]);

  if (!employeeInstruments || employeeInstruments.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', fontSize: '2em' }}>No instruments assigned</div>;
  }

  return (
    <Table
      bordered
      columns={columns}
      dataSource={employeeInstruments}
      pagination={false}
      rowKey="_id"
    />
  );
};

export default InstrumentsTable;