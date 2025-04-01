import React, { useEffect, useState, useContext } from "react";

import { Col, Row } from "antd";

import ProjectCard from "./ProjectCard";
import ProjectsMenu from "./PeojectsMenu/ProjectsMenu";
import FOUCShield from "../common/FOUCShield";

import { UserContext } from "../contexts/userContext";
import { useProjects } from "../api/projectApi";

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isShowingOngoing, setIsShowingOngoing] = useState(false); // Track ongoing state
  const [isShowingFuture, setIsShowingFuture] = useState(false); // Track future state
  const { _id } = useContext(UserContext); // Get user ID from context

  const { projects: fetchProjects } = useProjects(); // Fetch projects from API
  const { ongoingProject: fetchOngoingProjects } = useProjects(); // Fetch ongoing projects from API
  const { futureProject: fetchFutureProjects } = useProjects(); // Fetch future projects from API

  const reloadProjects = async () => {
    setLoading(true); // Start loading
    try {
      const data = await fetchProjects();      
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error); // Error handling
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const loadOngoingProjects = async () => {
    setLoading(true); // Start loading
    try {      
      const data = await fetchOngoingProjects();
      console.log("Fetched ongoing projects:", data); // Debugging log
      setProjects(data);
    } catch (error) {
      console.error("Error fetching ongoing projects:", error); // Error handling
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const loadFutureProjects = async () => {
    setLoading(true); // Start loading
    try {
      const data = await fetchFutureProjects();
      console.log("Fetched future projects:", data); // Debugging log
      setProjects(data);
    } catch (error) {
      console.error("Error fetching future projects:", error); // Error handling
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const toggleOngoingProjects = () => {
    if (isShowingOngoing) {
      reloadProjects(); // Load all projects
    } else {
      loadOngoingProjects(); // Load ongoing projects
    }
    setIsShowingOngoing(!isShowingOngoing); // Toggle state
  };

  const toggleFutureProjects = () => {
    if (isShowingFuture) {
      reloadProjects(); // Load all projects
    } else {
      loadFutureProjects(); // Load future projects
    }
    setIsShowingFuture(!isShowingFuture); // Toggle state
  };

  useEffect(() => {
    reloadProjects();
  }, []); // Fetch all projects on initial load

    if (loading || !projects) {    
    return (
      <FOUCShield message="Loading projects..." />
    );
  }

  return (
    <>
      {_id && ( // Check if _id exists before showing the menu
        <ProjectsMenu
          reloadProjects={reloadProjects}
          toggleOngoingProjects={toggleOngoingProjects} // Pass toggle function
          isShowingOngoing={isShowingOngoing} // Pass ongoing state
          toggleFutureProjects={toggleFutureProjects} // Pass toggle function
          isShowingFuture={isShowingFuture} // Pass future state
          setProjects={setProjects} // Pass setProjects to allow direct updates
        />
      )}
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
