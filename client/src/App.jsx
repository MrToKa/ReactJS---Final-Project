import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Instruments from "./pages/Instruments";
import InstrumentItemDetails from "./pages/InstrumentItemDetails";
import Option2 from "./pages/Option2";
import Navbar from "./components/Layout/navbar";
import NotFound from "./pages/404";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/instruments/:instrumentId" element={<InstrumentItemDetails />} />
        <Route path="/option2" element={<Option2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
