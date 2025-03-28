import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router"; // Correct import for useParams

import { Card, Flex, Typography } from "antd";
import ProjectService from "../../services/ProjectService";
import ProjectDetailsMenu from "./ProjectDetailsMenu/ProjectDetailsMenu";
import ProjectEmployeesTable from "./ProjectEmployeesTable/ProjectEmployeesTable";

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
        <Flex justify="space-between">
          <img
            alt={project.name}
            src={project.image}
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
              {project.name || "No Name Available"}
            </Typography.Title>
            <Typography.Text>
              {project.location || "No Location Available"}
            </Typography.Text>
            <Typography.Text>
              {project.startDate || "No Start Date"}
            </Typography.Text>
            <Typography.Text>
              {project.endDate || "No End Date"}
            </Typography.Text>
            <Typography.Text>{project.status || "No Status"}</Typography.Text>
            <Typography.Text>
              {project.description || "No Description Available"}
            </Typography.Text>
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
