import React from 'react';
import { Link, useNavigate } from 'react-router';

import { Menu } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const authMenu = [
  {
    key: '/login',
    label: <Link to="/login">Login</Link>,
    icon: <LoginOutlined />,
    title: 'Login',
  },
  {
    key: '/logout',
    label: <Link to="/logout">Login</Link>,
    icon: <LogoutOutlined />,
    title: 'Logout',
  },
];

const onClick = (e, navigate) => {
  navigate(e.key);
};

export default function AuthMenu() {
  const navigate = useNavigate();

  return (          
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[window.location.pathname]}      
        items={authMenu}      
        style={{
          flex: 0,
          minWidth: 0,
        }}
        onClick={(e) => onClick(e, navigate)}
      />   
  );
};
