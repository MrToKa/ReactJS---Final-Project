import { Radio, Tabs } from 'antd';

export default function EmployeeTab() {
  const items = [
    {
      label: 'Projects',
      key: '1',
      children: 'Table of projects',
    },
    {
      label: 'Instruments',
      key: '2',
      children: 'Table of instruments',
    },
  ];

  return (
    <div>      
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        style={{
          marginBottom: 32,
        }}
        items={Array.from({
          length: 2,
        }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `${items[i].label}`,
            key: id,
            children: `${items[i].children}`,
          };
        })}
      />      
    </div>
  );
};