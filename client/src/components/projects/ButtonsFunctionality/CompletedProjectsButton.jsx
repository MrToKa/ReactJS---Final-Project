import { Button } from 'antd';
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import ProjectService from "../../../services/ProjectService";

export default function CompletedProjectsButton({ setProjects, isCompletedActive, setIsCompletedActive, resetStyles }) {
  const toggleCompletedProjects = async () => {
    if (isCompletedActive) {
      await ProjectService.getAll().then(setProjects); // Load all projects
    } else {
      await ProjectService.getCompletedProjects().then(setProjects); // Load completed projects
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
