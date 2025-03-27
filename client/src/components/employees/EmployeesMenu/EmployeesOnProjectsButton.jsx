import {Button} from 'antd';
import { TeamOutlined, UndoOutlined } from '@ant-design/icons';
import EmployeeService from "../../../services/EmployeeService";

export default function EmployeesOnProjectsButton({ setEmployees, isOnProjectActive, setIsOnProjectActive, resetStyles }) {
    const toggleEmployeesOnProjects = async () => {
        if (isOnProjectActive) {
            await EmployeeService.getAll().then(setEmployees); // Load all employees
        } else {
            await EmployeeService.getEmployeesOnProjects().then(setEmployees); // Load employees on projects
        }
        setIsOnProjectActive(!isOnProjectActive); // Toggle state
    };

    return (
        <Button
            type="primary"
            icon={isOnProjectActive ? <UndoOutlined /> : <TeamOutlined />} // Toggle icon
            style={{
                backgroundColor: isOnProjectActive ? "red" : undefined, // Toggle color
                borderColor: isOnProjectActive ? "red" : undefined,
            }}
            onClick={() => {
                resetStyles(); // Reset styles of other buttons
                toggleEmployeesOnProjects(); // Toggle employees
            }}
        >
            {isOnProjectActive ? "Show all employees" : "Show employees on projects"} {/* Toggle text */}
        </Button>
    );
}