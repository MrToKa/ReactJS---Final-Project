import { Button } from 'antd';
import { CaretRightOutlined, UndoOutlined } from '@ant-design/icons';
import ProjectService from "../../../services/projectService";

export default function OngoingProjectsButton({ setProjects, isOngoingActive, setIsOngoingActive, resetStyles }) {
  const toggleOngoingProjects = async () => {
    if (isOngoingActive) {
      await ProjectService.getAll().then(setProjects); // Load all projects
    } else {
      await ProjectService.getOngoingProjects().then(setProjects); // Load ongoing projects
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
