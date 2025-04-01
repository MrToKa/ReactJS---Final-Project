import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { Menu } from 'antd';
import { ScheduleOutlined, ContactsOutlined, ToolOutlined, HomeOutlined } from '@ant-design/icons';

import { UserContext } from "../contexts/userContext";

export default function MainMenu () {
  const navigate = useNavigate();
  const isLoggedIn = useContext(UserContext)._id !== undefined;

  const items = [
    {
      key: '/',
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
      title: 'Home',
    },
    {
      key: '/projects',
      label: <Link to="/projects">Projects</Link>,
      icon: <ScheduleOutlined />,
      title: 'Projects',
    },
    ...(isLoggedIn
      ? [
          {
            key: '/employees',
            label: <Link to="/employees">Employees</Link>,
            icon: <ToolOutlined />,
            title: 'Employees',
          },
          {
            key: '/instruments',
            label: <Link to="/instruments">Instruments</Link>,
            icon: <ContactsOutlined />,
            title: 'Instruments',
          },
        ]
      : []),
  ];

  const onClick = (e) => {
    navigate(e.key);
  };

  const getSelectedKey = () => {
    const path = window.location.pathname;
    if (path.startsWith('/projects')) return '/projects';
    if (path.startsWith('/employees')) return '/employees';
    if (path.startsWith('/instruments')) return '/instruments';
    if (path === '/') return '/'; // Home path
    return path; // Default to exact match for other paths
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[getSelectedKey()]}
      items={items}
      style={{
        flex: 1,
        minWidth: 0,
      }}
      onClick={onClick}
    />
  );
};
