import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";
import ProjectCard from "./ProjectCard";
import AdminMenu from "./ProjectsMenu";
import ProjectService from "../../services/ProjectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const reloadProjects = () => {
    ProjectService.getAll().then(setProjects);
  };

  useEffect(() => {
    reloadProjects();
  }, []);

  return (
    <>
      <AdminMenu reloadProjects={reloadProjects} />
      {projects.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "4 rem" }}>
          No projects yet!
        </div>
      ) : (
        <Row gutter={24} justify="center" style={{ height: "auto" }}>
          {projects.map((project) => (
            <Col key={project._id} span={6}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
