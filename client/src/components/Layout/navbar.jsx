import { ScheduleOutlined, ContactsOutlined, ToolOutlined } from '@ant-design/icons';

export const items = [
  {
    label: 'Projects',
    key: 'projects',
    icon: <ScheduleOutlined />,
  },
  {
    label: 'Employees',
    key: 'employees',
    icon: <ContactsOutlined />,
  },
  {
    label: 'Instruments',
    key: 'instruments',
    icon: <ToolOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  }
];
