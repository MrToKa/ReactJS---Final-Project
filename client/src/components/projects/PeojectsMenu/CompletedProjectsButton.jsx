import { Button } from 'antd';
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import { useCompletedProjects } from "../../api/projectApi"; // Import the custom hook
import { useProjects } from '../../api/projectApi';

export default function CompletedProjectsButton({ setProjects, isCompletedActive, setIsCompletedActive, resetStyles }) {
  const { projects: fetchProjects } = useProjects(); // Fetch projects from API
  const { completedProjects } = useCompletedProjects(); // Use the custom hook to get completed projects


  const toggleCompletedProjects = async () => {
    if (isCompletedActive) {
      await fetchProjects().then(setProjects); // Load all projects
    } else {
      await completedProjects().then(setProjects); // Load completed projects
    }
    setIsCompletedActive(!isCompletedActive); // Toggle state
  };

  return (
    <Button
      type="primary"
      icon={isCompletedActive ? <UndoOutlined /> : <CheckOutlined />} // Toggle icon
      style={{
        backgroundColor: isCompletedActive ? "green" : undefined, // Toggle color
        borderColor: isCompletedActive ? "green" : undefined,
      }}
      onClick={() => {
        resetStyles(); // Reset styles of other buttons
        toggleCompletedProjects(); // Toggle projects
      }}
    >
      {isCompletedActive ? "Show all projects" : "Show completed"} {/* Toggle text */}
    </Button>
  );
}
