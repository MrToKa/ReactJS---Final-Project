import { Button } from 'antd';
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import EmployeeService from "../../../services/EmployeeService";

export default function FreeEmployeesButton({ setEmployees, isFreeActive, setIsFreeActive, resetStyles }) {
    const toggleFreeEmployees = async () => {
        if (isFreeActive) {
        await EmployeeService.getAll().then(setEmployees); // Load all employees
        } else {
        await EmployeeService.getFreeEmployees().then(setEmployees); // Load free employees
        }
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