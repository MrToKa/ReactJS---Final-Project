import { useState } from 'react';
import { Link } from 'react-router';

import { Card, Button } from 'antd';
import { AimOutlined , EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function ProjectCard({ project }) {
    const [loading, setLoading] = useState(true);

    return (
        <Card
        loading={loading}
        onLoad={() => setLoading(false)}
            style={{
                width: 400,
                height: 435,
                margin: '10px',
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
                <Link to={`/projects/${project._id}`} key="ellipsis">
                    <Button type="text" icon={<EyeOutlined />}>See More...</Button>
                </Link>,
            ]}
        >
            <Meta
                title={project.name}
                description={
                    <span>
                        <AimOutlined style={{ marginRight: 8 }} />
                        {project.location}
                        <br/>
                        {project.status}
                    </span>
                }
            />
        </Card>
    );
};

