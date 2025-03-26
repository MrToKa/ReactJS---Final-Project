import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";
import ProjectCard from "./ProjectCard";
import ProjectsMenu from "./ProjectsMenu";
import ProjectService from "../../services/ProjectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isShowingOngoing, setIsShowingOngoing] = useState(false); // Track ongoing state

  const reloadProjects = () => {
    ProjectService.getAll().then(setProjects); // Fetch all projects
  };

  const loadOngoingProjects = () => {
    ProjectService.getOngoingProjects().then(setProjects); // Fetch ongoing projects
  };

  const toggleOngoingProjects = () => {
    if (isShowingOngoing) {
      reloadProjects(); // Load all projects
    } else {
      loadOngoingProjects(); // Load ongoing projects
    }
    setIsShowingOngoing(!isShowingOngoing); // Toggle state
  };

  useEffect(() => {
    reloadProjects();
  }, []);

  return (
    <>
      <ProjectsMenu
        reloadProjects={reloadProjects}
        toggleOngoingProjects={toggleOngoingProjects} // Pass toggle function
        isShowingOngoing={isShowingOngoing} // Pass ongoing state
        setProjects={setProjects} // Pass setProjects to allow direct updates
      />
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
