import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Card, Flex, Typography } from "antd";
import EmployeeTab from "./EmployeeDetailsTabs";
import EmployeeService from "../../services/EmployeeService";

const imgStyle = {
  display: "block",
  width: "300px",
  height: "300px",
  objectFit: "contain",
  padding: 0,
};

export default function Employee() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    EmployeeService.getById(employeeId)
      .then((response) => {
        if (response && typeof response === "object") {
          setEmployee(response);
        } else {
          console.error("Invalid response format:", response);
          setEmployee({});
        }
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
        setEmployee({});
      });
  }, [employeeId]);

  return (
    <>
      <Card
        styles={{
          body: {
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <Flex justify="space-between">
          <img
            alt="ProfilePicture"
            src={employee.image}
            style={imgStyle}
          />
          <Flex
            vertical
            align="flex-end"
            justify="space-between"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title level={3}>
              {employee.firstName} {employee.lastName}
            </Typography.Title>
            <Typography.Text>{employee.email}</Typography.Text>
          </Flex>
        </Flex>
      </Card>

      <EmployeeTab />
    </>
  );
}
