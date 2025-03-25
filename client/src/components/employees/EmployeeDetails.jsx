import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Card, Flex, Typography } from "antd";
import EmployeeTab from "./EmployeeDetailsTabs";

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
    fetch(`https://fakestoreapi.com/users/${employeeId}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data));
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
            src={"https://www.worldhistory.org/img/c/p/1600x900/17904.png"}
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
              {employee.name?.firstname} {employee.name?.lastname}
            </Typography.Title>
            <Typography.Text>{employee.email}</Typography.Text>
          </Flex>
        </Flex>
      </Card>

      <EmployeeTab />
    </>
  );
}
