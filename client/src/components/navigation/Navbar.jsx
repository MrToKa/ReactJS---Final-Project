import React from 'react';
import { Link, useNavigate } from 'react-router';

import { Menu } from 'antd';
import { ScheduleOutlined, ContactsOutlined, ToolOutlined, HomeOutlined } from '@ant-design/icons';

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

];

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const onClick = (e) => {
    navigate(e.key); // Use navigate instead of window.location.pathname
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[window.location.pathname]}      
      items={items}      
      style={{
        flex: 1,
        minWidth: 0,
      }}
      onClick={onClick}
    />
  );
};

export default Navbar;