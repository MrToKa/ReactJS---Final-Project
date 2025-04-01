
import { Flex, Typography, Spin } from "antd";

export default function FOUCShield({message}) {
return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Spin />
      <Typography.Text>{message}</Typography.Text>
    </Flex>
  );
}