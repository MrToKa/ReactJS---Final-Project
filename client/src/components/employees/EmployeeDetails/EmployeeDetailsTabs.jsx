import { Tabs } from 'antd';

import InstrumentsTable from './InstrumentsTable';
import ProjectsTable from './ProjectsTable';

export default function EmployeeTab({ refreshKey }) { // Accept refreshEmployee as a prop
  const items = [
    {
      label: 'Projects',
      key: '1',
      children: <ProjectsTable refreshKey={refreshKey} />, // Pass refreshEmployee to ProjectsTable
    },
    {
      label: 'Instruments',
      key: '2',
      children: <InstrumentsTable refreshKey={refreshKey} />, // No changes needed here
    },
  ];

  return (
    <div>      
      <Tabs
        tabPosition="top"
        animated={false}
        tabBarStyle={{
          marginBottom: 0,
          backgroundColor: "#f0f2f5",
          fontSize: "1.5em",
        }}
        tabBarGutter={0}      
        defaultActiveKey="1"
        type="card"
        size="large"
        style={{
          marginBottom: 32,
        }}        
        items={items} // Use the updated items array directly
      />      
    </div>
  );
};