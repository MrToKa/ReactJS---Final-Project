import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router"; // Correct import for useParams

import { Card, Flex, Typography } from "antd";
import ProjectService from "../../../services/projectService";
import ProjectDetailsMenu from "../ProjectDetails/ProjectDetailsMenu/ProjectDetailsMenu";
import ProjectEmployeesTable from "../ProjectDetails/ProjectEmployeesTable";

const imgStyle = {
  display: "block",
  width: "300px",
  height: "300px",
  objectFit: "contain",
  padding: 0,
};

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const refreshProject = useCallback(() => {
    ProjectService.getById(projectId).then((data) => {
      if (data) {
        setProject(data);
      } else {
        console.error("Failed to fetch project data or data is null.");
      }
    });
  }, [projectId]);

  useEffect(() => {
    refreshProject();
  }, [refreshProject]);

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
            alt={project.name}
            src={project.image}
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
              {project.name}
            </Typography.Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography.Text>
                <strong>Location:</strong> {project.location}
              </Typography.Text>
              <Typography.Text>
                <strong>Start date:</strong> {project.startDate}
              </Typography.Text>
              <Typography.Text>
                <strong>End date:</strong> {project.endDate}
              </Typography.Text>
              <Typography.Text>
                <strong>Project status:</strong> {project.status}
              </Typography.Text>
              <Typography.Text>
                <strong>Description:</strong> {project.description}
              </Typography.Text>
            </div>
          </Flex>
        </Flex>
      </Card>

      <ProjectDetailsMenu refreshProject={refreshProject} />
      
      {project.name && project.status !== "future" && (
          <ProjectEmployeesTable project={project} />
      )}
    </>
  );
}
