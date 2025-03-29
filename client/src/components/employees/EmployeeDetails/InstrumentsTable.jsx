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
  return (
    <Table
      columns={columns}
      dataSource={instruments}
      pagination={false}
      rowKey="_id"
    />
  );
}