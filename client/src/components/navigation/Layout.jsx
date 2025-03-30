import React from 'react';
import { Routes, Route } from "react-router";

import { Layout } from 'antd';

import Home from "../home/Home";
import Projects from "../projects/Projects";
import ProjectDetails from "../projects/ProjectDetails";
import Employees from "../employees/Employees";
import EmployeeDetails from "../employees/EmployeeDetails/EmployeeDetails";
import Instruments from "../instruments/Instruments";
import Navbar from "../navigation/Navbar";
import AuthMenu from "../navigation/Authentication";
import Login from "../navigation/Login";
import NotFound from "../404";

const { Header, Footer, Sider, Content } = Layout;

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

export default function AppLayout() {
    return (
        <>
        <Header style={headerStyle}>            
            <div style={navbarStyle}>
                <Navbar />
            </div>
            <div style={authMenuStyle}>
                <AuthMenu />
            </div>
        </Header>
            
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="/instruments" element={<Instruments />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>      

        </>
    );
}