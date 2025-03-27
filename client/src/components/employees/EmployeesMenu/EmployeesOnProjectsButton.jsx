import {Button} from 'antd';
import { TeamOutlined, UndoOutlined } from '@ant-design/icons';
import EmployeeService from "../../../services/EmployeeService";

export default function EmployeesOnProjectsButton({ isOnProjectActive, setIsOnProjectActive, resetStyles, processAndSetEmployees }) {
    const toggleEmployeesOnProjects = async () => {
        const employees = isOnProjectActive
            ? await EmployeeService.getAll() // Load all employees
            : await EmployeeService.getEmployeesOnProjects(); // Load employees on projects
        processAndSetEmployees(employees); // Update full list of employees
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