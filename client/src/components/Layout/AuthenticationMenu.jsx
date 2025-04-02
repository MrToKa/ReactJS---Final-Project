import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { Menu } from 'antd';
import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';

import { UserContext } from "../contexts/userContext";

const onClick = (e, navigate) => {
  navigate(e.key);
};

export default function AuthMenu() {
  const navigate = useNavigate();
  const isLoggedIn = useContext(UserContext)._id !== undefined;

  const authMenu = isLoggedIn
    ? [
      {
        key: '/create',
        label: <Link to="/create">Create Account</Link>,
        icon: <UserAddOutlined />,
        title: 'Create Account',
      },
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
