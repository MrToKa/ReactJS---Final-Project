import React from 'react';

import { Button } from 'antd';
import { ClockCircleOutlined, UndoOutlined } from '@ant-design/icons';

import { useFutureProjects } from "../../api/projectApi"; // Import the custom hook
import { useProjects } from '../../api/projectApi';

export default function FutureProjectsButton({ setProjects, isFutureActive, setIsFutureActive, resetStyles }) {
  const { projects: fetchProjects } = useProjects(); // Fetch projects from API
  const { futureProjects } = useFutureProjects(); // Use the custom hook to get future projects

  const toggleFutureProjects = async () => {
    if (isFutureActive) {
      await fetchProjects().then(setProjects); // Load all projects
    } else {
      await futureProjects().then(setProjects).catch((error) => {
        console.error("Error fetching future projects:", error); // Error handling
      }); // Load future projects
    }
    setIsFutureActive(!isFutureActive); // Toggle state
  };

  return (
    <Button
      type="primary"
      icon={isFutureActive ? <UndoOutlined /> : <ClockCircleOutlined />} // Toggle icon
      style={{
        backgroundColor: isFutureActive ? "blue" : undefined, // Toggle color
        borderColor: isFutureActive ? "blue" : undefined,
      }}
      onClick={() => {
        resetStyles(); // Reset styles of other buttons
        toggleFutureProjects(); // Toggle projects
      }}
    >
      {isFutureActive ? "Show all projects" : "Show future"} {/* Toggle text */}
    </Button>
  );
}
