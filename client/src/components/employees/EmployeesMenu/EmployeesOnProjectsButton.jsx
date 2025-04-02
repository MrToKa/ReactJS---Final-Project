import { Button } from 'antd';
import { TeamOutlined, UndoOutlined } from '@ant-design/icons';
import { useEmployees, useEmployeesOnProjects } from "../../api/employeesApi";

export default function EmployeesOnProjectsButton({ isOnProjectActive, setIsOnProjectActive, resetStyles, processAndSetEmployees }) {
    const { fetchEmployeesOnProjects } = useEmployeesOnProjects(); // Use the refactored function
    const { employees: fetchEmployees } = useEmployees(); // Use the refactored function

    const toggleEmployeesOnProjects = async () => {
        if (isOnProjectActive) {
            const allEmployees = await fetchEmployees(); // Fetch all employees
            processAndSetEmployees(allEmployees, true); // Process and set all employees
        } else {
            const employeesOnProjects = await fetchEmployeesOnProjects(); // Fetch employees on projects
            processAndSetEmployees(employeesOnProjects, true); // Process and set employees on projects
        }
        setIsOnProjectActive(!isOnProjectActive); // Toggle the state
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