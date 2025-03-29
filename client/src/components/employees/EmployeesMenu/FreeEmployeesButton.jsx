import { Button } from 'antd';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import EmployeeService from "../../../services/EmployeeService";

export default function FreeEmployeesButton({ isFreeActive, setIsFreeActive, resetStyles, processAndSetEmployees }) {
    const toggleFreeEmployees = async () => {
        const employees = isFreeActive
            ? await EmployeeService.getAll() // Load all employees
            : await EmployeeService.getFreeEmployees(); // Load free employees
        processAndSetEmployees(employees); // Update full list of employees and recalculate paginated data
        setIsFreeActive(!isFreeActive); // Toggle state
    };
    
    return (
        <Button
        type="primary"
        icon={isFreeActive ? <UndoOutlined /> : <CheckOutlined />} // Toggle icon
        style={{
            backgroundColor: isFreeActive ? "red" : undefined, // Toggle color
            borderColor: isFreeActive ? "red" : undefined,
        }}
        onClick={() => {
            resetStyles(); // Reset styles of other buttons
            toggleFreeEmployees(); // Toggle employees
        }}
        >
        {isFreeActive ? "Show all employees" : "Show free"} {/* Toggle text */}
        </Button>
    );
}