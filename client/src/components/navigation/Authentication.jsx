import React from 'react';
import { Link } from 'react-router';

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

const onClick = (e) => {
  window.location.pathname = e.key;
}

export default function AuthMenu() {
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
        onClick={onClick}
      />   
  );
};
