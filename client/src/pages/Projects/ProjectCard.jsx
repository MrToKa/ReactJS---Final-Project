import React from 'react';

import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';

const { Meta } = Card;

export default function ProjectCard({ project }) {
    return (
        <Card
            style={{
                width: 400,
                height: 405,
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
                <Button type="text" icon={<EditOutlined />} key="edit">Edit</Button>,
                <Button type="text" icon={<EllipsisOutlined />} key="ellipsis">More</Button>,
            ]}
        >
            <Meta
                title={project.name}
                description={project.location}
            />
        </Card>
    );
};

