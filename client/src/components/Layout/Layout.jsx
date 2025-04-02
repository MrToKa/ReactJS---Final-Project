import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router";

import { Layout } from 'antd';

import Home from "../home/Home";
import Projects from "../projects/Projects";
import ProjectDetails from "../projects/ProjectDetails/ProjectDetails";
import Employees from "../employees/Employees";
import EmployeeDetails from "../employees/EmployeeDetails/EmployeeDetails";
import Instruments from "../instruments/Instruments";
import MainMenu from "./MainMenu";
import AuthMenu from "./AuthenticationMenu";
import Login from "../account/login/Login";
import Logout from "../account/logout/Logout";
import Create from "../account/create/Create";
import NotFound from "../404";
import { UserContext } from "../contexts/userContext";

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',  
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navbarStyle = {
  flex: 3, // Adjust flex ratio for Navbar
  overflow: 'hidden',
};

const authMenuStyle = {
  flex: 1, // Adjust flex ratio for AuthMenu
  textAlign: 'right',
};

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const user = useContext(UserContext);
  return user._id ? children : <Navigate to="/login" />;
}

// GuestRoute component
function GuestRoute({ children }) {
  const user = useContext(UserContext);
  return !user._id ? children : <Navigate to="/" />;
}

export default function AppLayout() {
    return (
        <>
        <Header style={headerStyle}>            
            <div style={navbarStyle}>
                <MainMenu />
            </div>
            <div style={authMenuStyle}>
                <AuthMenu />
            </div>
        </Header>        
        <Content style={{ padding: '0 50px', minHeight: '100vh' }}>  
            <div style={{ padding: 24, minHeight: 380, background: '#fff' }}>
                         
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
                <Route path="/employees/:employeeId" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
                <Route path="/instruments" element={<ProtectedRoute><Instruments /></ProtectedRoute>} />
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
        </Content>  
        <Footer style={{ textAlign: 'center' }}>
            <p>© 2025 "The Cool Company" Inc. All rights reserved.</p>
            <p>Developed by Todor Chankov for SoftUni ReactJS February 2025 Final Project Defense</p>
            <p>Version 1.0.0</p>
        </Footer>    
        </>
    );
}