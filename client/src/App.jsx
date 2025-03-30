import React from "react";
import { Routes, Route } from "react-router";

import AppLayout from "./components/navigation/Layout";
import Home from "./components/home/Home";
import Projects from "./components/projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import Employees from "./components/employees/Employees";
import EmployeeDetails from "./components/employees/EmployeeDetails/EmployeeDetails";
import Instruments from "./components/instruments/Instruments";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/navigation/Login";
import NotFound from "./components/404";

const App = () => {
  return (
    <>
      <AppLayout>
    
      </AppLayout>

      {/* <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </>
  );
};

export default App;
