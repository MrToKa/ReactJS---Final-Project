import React from 'react';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

export default function ProjectCard({ project }) {
    return (
        <Card
            style={{
                width: 400, // Fixed width
                height: 400, // Fixed height
                margin: '20px', // Adjusted margin for spacing
            }}
            cover={
                <div style={{ width: 400, height: 250, overflow: 'hidden' }}> {/* Fixed dimensions */}
                    <img
                        alt="example"
                        src={project.image}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain' // Ensures the image fits within the container while maintaining aspect ratio
                        }} 
                    />
                </div>
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                title={project.name}
                description={project.location}
            />
        </Card>
    );
};

