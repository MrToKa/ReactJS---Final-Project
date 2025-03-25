import React from 'react';

import { useParams } from 'react-router';

const ProjectId = () => {
    const { projectId } = useParams();

    return <h1>Project ID: {projectId} Details</h1>;
};

export default function ProjectDetails() {
  return (
    <>
      <ProjectId /> 
    </>
  );
};