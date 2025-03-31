import { Button } from 'antd';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import { useEmployees, useFreeEmployees } from '../../api/employeesApi';

export default function FreeEmployeesButton({ isFreeActive, setIsFreeActive, resetStyles, processAndSetEmployees }) {    
    const { employees: fetchEmployees } = useEmployees(); // Use the refactored function
    const { freeEmployees } = useFreeEmployees(); // Use the refactored function    
    
    const toggleFreeEmployees = async () => {
        const employees = isFreeActive
            ? await fetchEmployees() // Load all employees
            : await freeEmployees(); // Load free employees
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