import React, { useState } from 'react';

import { Card, Button, Flex } from 'antd';
import { FastBackwardOutlined, FastForwardOutlined } from '@ant-design/icons';
import CreateProjectButton from './ButtonsFunctionality/CreateProjectButton';
import OngoingProjectsButton from './ButtonsFunctionality/OngoingProjectsButton';
import CompletedProjectsButton from './ButtonsFunctionality/CompletedProjectsButton';
import FutureProjectsButton from './ButtonsFunctionality/FutureProjectsButton';

const ProjectsMenu = ({ reloadProjects, setProjects }) => {
  const [isOngoingActive, setIsOngoingActive] = useState(false); // Track ongoing button state
  const [isCompletedActive, setIsCompletedActive] = useState(false); // Track completed button state
  const [isFutureActive, setIsFutureActive] = useState(false); // Track future button state

  const resetStyles = () => {
    setIsOngoingActive(false); // Reset ongoing button state
    setIsCompletedActive(false); // Reset completed button state
    setIsFutureActive(false); // Reset future button state
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
          <CompletedProjectsButton
            setProjects={setProjects}
            isCompletedActive={isCompletedActive}
            setIsCompletedActive={setIsCompletedActive}
            resetStyles={resetStyles} // Pass resetStyles
          />
          <FutureProjectsButton
            setProjects={setProjects}
            isFutureActive={isFutureActive}
            setIsFutureActive={setIsFutureActive}
            resetStyles={resetStyles} // Pass resetStyles
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProjectsMenu;