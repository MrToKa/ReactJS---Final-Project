import { Button } from 'antd';
import { ClockCircleOutlined, UndoOutlined } from '@ant-design/icons';
import ProjectService from "../../../services/ProjectService";

export default function FutureProjectsButton({ setProjects, isFutureActive, setIsFutureActive, resetStyles }) {
  const toggleFutureProjects = async () => {
    if (isFutureActive) {
      await ProjectService.getAll().then(setProjects); // Load all projects
    } else {
      await ProjectService.getFutureProjects().then(setProjects); // Load future projects
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
