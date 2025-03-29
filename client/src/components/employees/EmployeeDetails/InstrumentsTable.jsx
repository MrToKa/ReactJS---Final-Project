import React from 'react';

import { Table } from 'antd';

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
  }
];

export default function InstrumentsTable({ instruments }) {
  if (!instruments || instruments.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', fontSize: '2em' }}>No instruments assigned</div>;
  }

  return (
    <Table
      columns={columns}
      dataSource={instruments}
      pagination={false}
      rowKey="_id"
    />
  );
}