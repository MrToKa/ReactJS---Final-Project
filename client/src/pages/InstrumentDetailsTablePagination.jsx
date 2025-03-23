import React from 'react';
import { Pagination } from 'antd';

export default function TablePagination({ InstrumentsType, pageSize, onChange }) {
  return (
    <Pagination
      total={InstrumentsType.length}
      pageSize={pageSize} 
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultCurrent={1}
      onChange={onChange} 
    />
  );
};