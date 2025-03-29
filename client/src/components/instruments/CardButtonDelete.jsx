import React from "react";

import { ExclamationCircleFilled } from "@ant-design/icons";

import { Button, Modal, Space } from "antd";

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export default function CardButtonDelete({ instrument }) {
  return (    
      <Button color="danger" variant="solid" onClick={showConfirm}>Delete</Button>    
  );
}
