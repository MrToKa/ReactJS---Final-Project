import React from 'react';
import { Link } from 'react-router';

import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`/projects/${record._id}`}>{text}</Link>,
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

export default function ProjectsTable({ projects }) {
  if (!projects || projects.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', fontSize: '2em' }}>No previous experience...</div>;
  }

  return (
    <Table
      columns={columns}
      dataSource={projects}
      pagination={false}
      rowKey="_id"
    />
  );
}