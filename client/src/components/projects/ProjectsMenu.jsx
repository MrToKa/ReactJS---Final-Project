import React from 'react';

import { Card, Button, Flex } from 'antd';
import { FastBackwardOutlined, FastForwardOutlined, CaretRightOutlined } from '@ant-design/icons';
import CreateProjectButton from './CreateProjectButton';

const AdminMenu = () => (
  <Card>
    <Flex gap="large" vertical>
    <Flex wrap gap="large" justify="center">
        <CreateProjectButton />
      <Button type="primary" icon={<CaretRightOutlined />}>
      Show ongoing
      </Button>
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

export default AdminMenu;