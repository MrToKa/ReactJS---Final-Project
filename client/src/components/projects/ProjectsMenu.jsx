import React, { useState } from 'react';

import { Card, Button, Flex } from 'antd';
import { FastBackwardOutlined, FastForwardOutlined } from '@ant-design/icons';
import CreateProjectButton from './CreateProjectButton';
import OngoingProjectsButton from './OngoingProjectsButton';

const ProjectsMenu = ({ reloadProjects, setProjects }) => {
  const [isOngoingActive, setIsOngoingActive] = useState(false); // Track ongoing button state

  const resetStyles = () => {
    setIsOngoingActive(false); // Reset ongoing button state
  };

  return (
    <Card>
      <Flex gap="large" vertical>
        <Flex wrap gap="large" justify="center">
          <CreateProjectButton reloadProjects={reloadProjects} resetStyles={resetStyles} /> {/* Pass resetStyles */}
          <OngoingProjectsButton
            setProjects={setProjects}
            isOngoingActive={isOngoingActive}
            setIsOngoingActive={setIsOngoingActive}
            resetStyles={resetStyles} // Pass resetStyles
          />
          <Button type="primary" icon={<FastBackwardOutlined />}>
            Show completed
          </Button>
          <Button type="primary" icon={<FastForwardOutlined />}>
            Show future
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProjectsMenu;