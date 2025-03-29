import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import EmployeeService from "../../../services/EmployeeService";

export default function ReturnHomeButton({ employeeId, refreshEmployee }) {
    const handleReturnHome = async() => {
        
        await EmployeeService.setEmployeeFree(employeeId);
        refreshEmployee();
    };

    return (
        <Button
                type="primary"
                icon={<HomeOutlined />}
                onClick={handleReturnHome}
            >
                Return Home
            </Button>
    );
}