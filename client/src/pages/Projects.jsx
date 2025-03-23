import React from 'react';

import { Col, Row } from 'antd';
import ProjectCard from './ProjectCard';

const projects = [{
  id: 1,
  name: 'Project Name',
  location: 'Copenhagen, Denmark',
  image: 'https://emag.directindustry.com/wp-content/uploads/sites/3/copenhill_big-yankodesign01.jpg',

},
{
  id: 2,
  name: 'Project Name',
  location: 'Jena, Germoney',
  image: 'https://www.bv-apolda.de/fileadmin/_processed_/d/0/csm_hkw-jena-12_699e638daa.jpg',
},
{
  id: 3,
  name: 'Project Name',
  location: 'Location',
  image: 'https://www.powerbuilt.com/cdn/shop/products/640948-01.jpg?v=1658745639',
},
{
  id: 4,
  name: 'Project Name',
  location: 'Location',
  image: 'https://www.powerbuilt.com/cdn/shop/products/640948-01.jpg?v=1658745639',
},
];

const Projects = () => (
  <Row gutter={24} justify="center" style={{ height: 'auto' }}> 
    {projects.map((project) => (
      <Col key={project.id} span={6}> 
        <ProjectCard project={project} />
      </Col>
    ))}
  </Row>
);

export default Projects;