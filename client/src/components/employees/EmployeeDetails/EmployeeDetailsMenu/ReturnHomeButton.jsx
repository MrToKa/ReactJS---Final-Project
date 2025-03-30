import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import EmployeeService from "../../../../services/employeeService";

export default function ReturnHomeButton({ employeeId, refreshEmployee }) {
    const handleReturnHome = async () => {        
        try {
            await EmployeeService.setEmployeeFree(employeeId);
            refreshEmployee(); // Refresh employee details
        } catch (error) {
            console.error("Error returning employee home:", error);
        }
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