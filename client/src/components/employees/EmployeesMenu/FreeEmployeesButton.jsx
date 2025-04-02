import { useState } from 'react'; // Import useState from React

import { Button } from 'antd';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import { useEmployees, useFreeEmployees } from '../../api/employeesApi';

export default function FreeEmployeesButton({ isFreeActive, setIsFreeActive, resetStyles, processAndSetEmployees }) {    
    const { employees: fetchEmployees } = useEmployees(); // Use the refactored function
    const { freeEmployees } = useFreeEmployees(); // Use the refactored function    

    const [loading, setLoading] = useState(false); // Loading state
    
    const toggleFreeEmployees = async () => {
        setLoading(true); // Set loading to true before fetching
        if (isFreeActive) {
            const allEmployees = await fetchEmployees(); // Fetch all employees
            processAndSetEmployees(allEmployees, true); // Process and set all employees
        } else {
            const freeEmployeesList = await freeEmployees(); // Fetch free employees
            processAndSetEmployees(freeEmployeesList, true); // Process and set free employees
        }
        setIsFreeActive(!isFreeActive); // Toggle the state
        setLoading(false); // Set loading to false after fetching
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
        disabled={loading} // Disable button while loading
        >
        {isFreeActive ? "Show all employees" : "Show free"} {/* Toggle text */}
        </Button>
    );
}