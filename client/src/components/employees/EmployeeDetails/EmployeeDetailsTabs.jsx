import { Radio, Tabs } from 'antd';

import InstrumentsTable from './InstrumentsTable';
import ProjectsTable from './ProjectsTable';

export default function EmployeeTab({ projects, instruments }) {
  const items = [
    {
      label: 'Projects',
      key: '1',
      children: <ProjectsTable projects={projects} />, // Pass projects data
    },
    {
      label: 'Instruments',
      key: '2',
      children: <InstrumentsTable instruments={instruments} />, // Pass instruments data
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