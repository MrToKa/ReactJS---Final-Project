import React, { useState } from 'react';

import { Card, Flex } from 'antd';
import CreateEmployeeButton from './CreateEmployeeButton';
import EmployeesOnProjectsButton from './EmployeesOnProjectsButton';
import FreeEmployeesButton from './FreeEmployeesButton';

const EmployeesMenu = ({ reloadEmployees, setEmployees }) => {
  const [isOnProjectsActive, setIsOnProjectsActive] = useState(false); // Track "on projects" button state
  const [isFreeActive, setIsFreeActive] = useState(false); // Track "free employees" button state

  const resetStyles = () => {
    setIsOnProjectsActive(false); // Reset "on projects" button state
    setIsFreeActive(false); // Reset "free employees" button state
  };

  return (
    <Card>
      <Flex gap="large" vertical>
        <Flex wrap gap="large" justify="center">
          <CreateEmployeeButton reloadEmployees={reloadEmployees} resetStyles={resetStyles} /> {/* Pass resetStyles */}
          <EmployeesOnProjectsButton
            setEmployees={setEmployees}
            isOnProjectsActive={isOnProjectsActive}
            setIsOnProjectsActive={setIsOnProjectsActive}
            resetStyles={resetStyles} // Pass resetStyles
          />
          <FreeEmployeesButton
            setEmployees={setEmployees}
            isFreeActive={isFreeActive}
            setIsFreeActive={setIsFreeActive}
            resetStyles={resetStyles} // Pass resetStyles
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default EmployeesMenu;
