import { useEffect, useState, useCallback, useContext } from "react"; // Add useContext import
import { useParams } from "react-router"; // Correct import for useParams

import { Card, Flex, Typography, Spin } from "antd";

import ProjectDetailsMenu from "../ProjectDetails/ProjectDetailsMenu/ProjectDetailsMenu";
import ProjectEmployeesTable from "../ProjectDetails/ProjectEmployeesTable";
import FOUCShield from "../../common/FOUCShield";

import { useProject } from "../../api/projectApi"; // Import the custom hook
import { UserContext } from "../../contexts/userContext";

const imgStyle = {
  display: "block",
  width: "300px",
  height: "300px",
  objectFit: "contain",
  padding: 0,
};

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);

  const { project: fetchProject } = useProject();

  const refreshProject = useCallback(() => {
    setLoading(true);
    fetchProject(projectId)
      .then((data) => {
        if (data) {
          setProject(data);
        } else {
          console.error("Failed to fetch project data or data is null.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  useEffect(() => {
    refreshProject();
  }, [refreshProject]);

  if (loading || !project) {    
    return (
      <FOUCShield message="Loading project details..." />
    );
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
            flexDirection: "row",
            gap: "32px",
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
              maxWidth: "600px",
            }}
          >
            <Typography.Title level={3}>
              {project.name}
            </Typography.Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography.Text><strong>Location:</strong> {project.location}</Typography.Text>
              <Typography.Text><strong>Start date:</strong> {project.startDate}</Typography.Text>
              <Typography.Text><strong>End date:</strong> {project.endDate}</Typography.Text>
              <Typography.Text><strong>Project status:</strong> {project.status}</Typography.Text>
              <Typography.Text><strong>Description:</strong> {project.description}</Typography.Text>
            </div>
          </Flex>
        </Flex>
      </Card>

      {user?._id === project._ownerId && (
        <ProjectDetailsMenu refreshProject={refreshProject} />
      )}

      {user?._id && project.name && project.status !== "future" && (
        <ProjectEmployeesTable project={project} />
      )}
    </>
  );
}
