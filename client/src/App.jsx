import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import Employees from "./pages/Employees/Employees";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import Instruments from "./pages/Instruments/Instruments";
import InstrumentItemDetails from "./pages/Instruments/InstrumentItemDetails";
import Navbar from "./components/Layout/navbar";
import NotFound from "./pages/404";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/instruments/:instrumentId" element={<InstrumentItemDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
