import { Button } from 'antd';
import { TeamOutlined, UndoOutlined } from '@ant-design/icons';
import { useEmployees, useEmployeesOnProjects } from "../../api/employeesApi";

export default function EmployeesOnProjectsButton({ isOnProjectActive, setIsOnProjectActive, resetStyles, processAndSetEmployees }) {
    const { fetchEmployeesOnProjects } = useEmployeesOnProjects(); // Use the refactored function
    const { employees: fetchEmployees } = useEmployees(); // Use the refactored function

    const toggleEmployeesOnProjects = async () => {
        const employees = isOnProjectActive
            ? await fetchEmployees() // Load all employees
            : await fetchEmployeesOnProjects(); // Call the function to load employees on projects

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