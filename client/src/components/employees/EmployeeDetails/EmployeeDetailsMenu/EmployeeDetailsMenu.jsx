import { useParams } from "react-router";

import { Flex } from "antd";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AssignProjectButton from "./AssignProjectButton";
import ReturnHomeButton from "./ReturnHomeButton";

export default function EmployeeDetailsMenu({ employee, refreshEmployee }) {
  const { employeeId } = useParams();

  return (
    <>
      <Flex wrap gap="large" justify="center">
        {employee.currentProject ? (
          <ReturnHomeButton 
            employeeId={employeeId}
            refreshEmployee={refreshEmployee} 
          />
        ) : (
          <AssignProjectButton
            employeeId={employeeId}
            refreshEmployee={refreshEmployee}
          />
        )}
        <EditButton employeeId={employeeId} 
        refreshEmployee={refreshEmployee} 
        />
        <DeleteButton employeeId={employeeId} />
      </Flex>
    </>
  );
}
