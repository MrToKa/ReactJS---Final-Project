import { Button } from 'antd';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import { useEmployees, useFreeEmployees } from '../../api/employeesApi';

export default function FreeEmployeesButton({ isFreeActive, setIsFreeActive, resetStyles, processAndSetEmployees }) {    
    const { employees: fetchEmployees } = useEmployees(); // Use the refactored function
    const { freeEmployees } = useFreeEmployees(); // Use the refactored function    
    
    const toggleFreeEmployees = async () => {
        if (isFreeActive) {
            const allEmployees = await fetchEmployees(); // Fetch all employees
            processAndSetEmployees(allEmployees, true); // Process and set all employees
        } else {
            const freeEmployeesList = await freeEmployees(); // Fetch free employees
            processAndSetEmployees(freeEmployeesList, true); // Process and set free employees
        }
        setIsFreeActive(!isFreeActive); // Toggle the state
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