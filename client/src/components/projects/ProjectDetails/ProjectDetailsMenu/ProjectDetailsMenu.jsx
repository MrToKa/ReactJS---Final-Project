import { useParams } from "react-router";

import { Card, Flex } from "antd";
import EditProjectButton from "./EditProjectButton";
import DeleteProjectButton from "./DeleteProjectButton";

export default function ProjectDetailsMenu({ refreshProject }) {
    const { projectId } = useParams();

    return (
        <Card>
            <Flex gap="large" vertical>
                <Flex wrap gap="large" justify="center">
                    <EditProjectButton projectId={projectId} refreshProject={refreshProject} />
                    <DeleteProjectButton projectId={projectId} />
                </Flex>
            </Flex>
        </Card>
    );
}
