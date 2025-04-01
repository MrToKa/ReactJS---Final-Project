import { Button } from 'antd';
import { CaretRightOutlined, UndoOutlined } from '@ant-design/icons';

import { useOngoingProjects } from "../../api/projectApi"; // Import the custom hook
import { useProjects } from '../../api/projectApi';

export default function OngoingProjectsButton({ setProjects, isOngoingActive, setIsOngoingActive, resetStyles }) {
  const { projects: fetchProjects } = useProjects(); // Fetch projects from API
  const { ongoingProjects } = useOngoingProjects(); // Use the custom hook to get ongoing projects

  const toggleOngoingProjects = async () => {
    if (isOngoingActive) {
      await fetchProjects().then(setProjects); // Load all projects
    } else {
      await ongoingProjects().then(setProjects); // Load ongoing projects
    }
    setIsOngoingActive(!isOngoingActive); // Toggle state
  };

  return (
    <Button
      type="primary"
      icon={isOngoingActive ? <UndoOutlined /> : <CaretRightOutlined />} // Toggle icon
      style={{
        backgroundColor: isOngoingActive ? "red" : undefined, // Toggle color
        borderColor: isOngoingActive ? "red" : undefined,
      }}
      onClick={() => {
        resetStyles(); // Reset styles of other buttons
        toggleOngoingProjects(); // Toggle projects
      }}
    >
      {isOngoingActive ? "Show all projects" : "Show ongoing"} {/* Toggle text */}
    </Button>
  );
}
