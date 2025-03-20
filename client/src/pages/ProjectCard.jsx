import React from 'react';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

export default function ProjectCard({ project }) {
    return (
        <Card
            hoverable
            style={{
                width: 400,
                height: 400,
                margin: '20px',
            }}
            cover={
                <div style={{ width: 398, height: 250, overflow: 'hidden', border: '1px solid #f0f0f0' }}> 
                    <img
                        alt="example"
                        src={project.image}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
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

