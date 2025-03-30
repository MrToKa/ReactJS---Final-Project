import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { Card, Flex, Typography } from "antd";
import EmployeeTab from "./EmployeeDetailsTabs";
import EmployeeDetailsMenu from "../EmployeeDetails/EmployeeDetailsMenu/EmployeeDetailsMenu";
import EmployeeService from "../../../services/employeeService";
import ProjectService from "../../../services/projectService";
import InstrumentService from "../../../services/instrumentService";

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
  const [projects, setProjects] = useState([]);
  const [currProject, setCurrProject] = useState("");
  const [instruments, setInstruments] = useState([]);

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

  useEffect(() => {
    ProjectService.getById(employee.currentProject)
      .then((response) => {
        if (response && typeof response === "object") {
          setCurrProject(response.name);
        } else {
          console.error("Invalid response format:", response);
          setCurrProject("");
        }
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setCurrProject("");
      });
  }, [employee.currentProject]);  

  useEffect(() => {
    if (Array.isArray(employee.previousProjects) && employee.previousProjects.length > 0) {
      const promises = employee.previousProjects.map((projectId) =>
        ProjectService.getById(projectId)
      );
      Promise.all(promises)
        .then((responses) => {
          const validProjects = responses.filter(
            (response) => response && typeof response === "object"
          ); // Filter out invalid responses
          setProjects(validProjects); // Store the full project objects
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          setProjects([]);
        });
    } else {
      setProjects([]);
    }
  }, [employee.previousProjects]);

 // useEffect to get all the instruments assigned to the employee
  useEffect(() => {
    if (employeeId) {
      InstrumentService.getAll()
        .then((response) => {
          if (response && Array.isArray(response)) {
            const filteredInstruments = response.filter(
              (instrument) => instrument.currentOwner === employeeId
            );
            setInstruments(filteredInstruments);
          } else {
            console.error("Invalid response format:", response);
            setInstruments([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching instruments:", error);
          setInstruments([]);
        });
    }
  }, [employeeId]);    

  const refreshEmployee = useCallback(() => {
    EmployeeService.getById(employeeId).then((data) => {
      if (data) {
        setEmployee(data);
      } else {
        console.error("Failed to fetch employee data or data is null.");
      }
    });
  }, [employeeId]);

  useEffect(() => {
    refreshEmployee();  
  }, [refreshEmployee]);

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
        <Flex
          justify="center"
          align="center"
          style={{
            width: "100%",
            flexDirection: "row", // Ensure horizontal alignment
            gap: "32px", // Add spacing between the image and text
          }}
        >
          <img
            alt="ProfilePicture"
            src={employee.image}
            style={imgStyle}
          />
          <Flex
            vertical
            align="flex-start"
            justify="space-between"
            style={{
              padding: 32,
              maxWidth: "600px", // Optional: Limit the width of the text section
            }}
          >
            <Typography.Title level={3}>
              {employee.firstName} {employee.lastName}
            </Typography.Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography.Text>
                <strong>E-mail:</strong> {employee.email}
              </Typography.Text>
              <Typography.Text>
                <strong>Job position:</strong> {employee.job}
              </Typography.Text>
              <Typography.Text>
                <strong>Current Project:</strong> {currProject}
              </Typography.Text>
            </div>
          </Flex>
        </Flex>
      </Card>

      <EmployeeDetailsMenu 
        employee={employee} // Pass employee object
        refreshEmployee={refreshEmployee} 
      />

      <EmployeeTab projects={projects} instruments={instruments} />
    </>
  );
}
