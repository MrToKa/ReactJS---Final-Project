import React from 'react';
import { Pagination } from 'antd';

export default function TablePagination({ items, onPageChange, tableName }) {
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handleChange = (page, pageSize) => {
    onPageChange(page, pageSize); // Notify the parent of the current page and page size
  };

  return (
    <Pagination
      total={items.length}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} ${tableName}`}
      defaultPageSize={2}
      defaultCurrent={1}
      showSizeChanger
      itemRender={itemRender}
      onChange={handleChange}
      pageSizeOptions={['2', '5', '10']}
    />
  );
};