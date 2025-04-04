import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { Card, Flex, Typography } from "antd";

import EmployeeTab from "./EmployeeDetailsTabs";
import EmployeeDetailsMenu from "../EmployeeDetails/EmployeeDetailsMenu/EmployeeDetailsMenu";
import FOUCShield from "../../common/FOUCShield";

import { useEmployee } from "../../api/employeesApi"; // Import the custom hook
import { useProject } from "../../api/projectApi";

const imgStyle = {
  display: "block",
  width: "300px",
  height: "300px",
  objectFit: "contain",
  padding: 0,
};

export default function Employee() {
  const [employee, setEmployee] = useState({});
  const [currProject, setCurrProject] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  
  const { employeeId } = useParams();
  const { employee: fetchEmployee } = useEmployee(); // Fetch employee data and loading state from API
  const { project: fetchProject } = useProject(); // Fetch project data and loading state from API

  const [refreshKey, setRefreshKey] = useState(0);

const refreshEmployee = useCallback(() => {
  setLoading(true); // Set loading to true before fetching
  fetchEmployee(employeeId).then((data) => {
    if (data) {
      setEmployee(data);
      setRefreshKey(prev => prev + 1); // Trigger refresh in children
    } else {
      console.error("Failed to fetch employee data or data is null.");
    }
    setLoading(false); // Set loading to false after fetching
  });
}, [employeeId]);

  
  useEffect(() => {
    if (employeeId) { // Ensure employeeId is defined
        setLoading(true); // Set loading to true before fetching
        fetchEmployee(employeeId).then((data) => { // Pass employeeId to fetchEmployee
            if (data) {
                setEmployee(data);
            } else {
                console.error("Failed to fetch employee data or data is null.");
            }
            setLoading(false); // Set loading to false after fetching
        });
    }
  }, [employeeId]); // Add fetchEmployee to dependencies

  useEffect(() => {
    if (employee.currentProject) { // Only fetch if currentProject is defined and not empty
      setLoading(true); // Set loading to true before fetching
      fetchProject(employee.currentProject)
        .then((response) => {
          if (response && response.name) {
            setCurrProject(response.name);
          } else {
            console.error("Invalid response format:", response);
            setCurrProject("");
          }
        })
        .catch((error) => {
          console.error("Error fetching project:", error);
          setCurrProject("");
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    } else if (employee.currentProject === "") {
      setCurrProject("Currently free"); // Handle empty currentProject
    }
  }, [employee.currentProject]); 

  useEffect(() => {
    refreshEmployee();  
  }, [refreshEmployee]);

  if (loading) {
    return <FOUCShield message="Loading employee data..." />; // Show loading shield while fetching data
  }

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

      <EmployeeTab refreshKey={refreshKey} /> {/* Pass refreshEmployee */}
    </>
  );
}
