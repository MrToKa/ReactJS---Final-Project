import { useParams } from "react-router";

import { Card, Flex } from "antd";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AssignProjectButton from "./AssignProjectButton";
import ReturnHomeButton from "./ReturnHomeButton";

export default function EmployeeDetailsMenu({ refreshEmployee }) {
  const { employeeId } = useParams();

  return (
    <Card>
      <Flex wrap gap="large" justify="center">
        <ReturnHomeButton 
        employeeId={employeeId}
        refreshEmployee={refreshEmployee} 
        />
        <AssignProjectButton
          employeeId={employeeId}
          refreshEmployee={refreshEmployee}
        />
        <EditButton employeeId={employeeId} 
        refreshEmployee={refreshEmployee} 
        />
        <DeleteButton employeeId={employeeId} />
      </Flex>
    </Card>
  );
}
