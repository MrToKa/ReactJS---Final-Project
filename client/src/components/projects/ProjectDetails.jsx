import { useEffect, useState } from "react";
import { useParams } from 'react-router';

import { Card, Flex, Typography } from "antd";
import ProjectService from "../../services/ProjectService";

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
  
  useEffect(() => {
    ProjectService.getById(projectId).then((data) => setProject(data));
  }, [projectId]);  
  

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
              {project.name}
            </Typography.Title>
            <Typography.Text>{project.location}</Typography.Text>
            <Typography.Text>{project.description}</Typography.Text>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};