import React from 'react';
import { Link, useNavigate } from 'react-router';

import { Menu } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const onClick = (e, navigate) => {
  navigate(e.key);
};

export default function AuthMenu() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('user')); // Example: Check if user is logged in

  const authMenu = isLoggedIn
    ? [
        {
          key: '/logout',
          label: <Link to="/logout">Logout</Link>,
          icon: <LogoutOutlined />,
          title: 'Logout',
        },
      ]
    : [
        {
          key: '/login',
          label: <Link to="/login">Login</Link>,
          icon: <LoginOutlined />,
          title: 'Login',
        },
      ];

  return (          
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[window.location.pathname]}      
        items={authMenu}      
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flex: 1,
        }}
        onClick={(e) => onClick(e, navigate)}
      />   
  );
};
