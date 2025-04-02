import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Table } from 'antd';
import { useEmployeeProjectHistory } from '../../api/employeesApi';
import { useProjects } from '../../api/projectApi';

import FOUCShield from '../../common/FOUCShield';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

export default function ProjectsTable({ refreshKey }) {
  const { employeeId } = useParams();
  const { getProjectsByEmployeeId } = useEmployeeProjectHistory();
  const { projects } = useProjects();
  const [loading, setLoading] = useState(true); // Loading state

  const [employeeProjects, setEmployeeProjects] = useState([]);

  const loadEmployeeProjects = async () => {
    setLoading(true); // Set loading to true before fetching
    const projectIds = await getProjectsByEmployeeId(employeeId);
    const allProjects = await projects(); // Fetch all projects

    const matchedProjects = allProjects.filter((proj) =>
      projectIds.includes(proj._id)
    );

    setEmployeeProjects(matchedProjects);
    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    loadEmployeeProjects(); // Run on refreshKey change
  }, [refreshKey]);

  if (loading) {
    return <FOUCShield message={"Loading experience datta..."} />; // Show loading state
  }

  if (!employeeProjects.length) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '2em' }}>
        No previous experience...
      </div>
    );
  }

  return (
    <Table
      bordered
      columns={columns}
      dataSource={employeeProjects}
      pagination={false}
      rowKey="_id"
    />
  );
}
