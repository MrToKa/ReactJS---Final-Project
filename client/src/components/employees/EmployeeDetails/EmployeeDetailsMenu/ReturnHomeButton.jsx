import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { useSetEmployeeFree } from "../../../api/employeesApi";

export default function ReturnHomeButton({ employeeId, refreshEmployee }) {
    const { setEmployeeFree } = useSetEmployeeFree(); // Fetch all instruments

    const handleReturnHome = async () => {        
        try {
            await setEmployeeFree(employeeId);
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