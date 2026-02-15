import { Modal as AntdModal } from "antd";
import type { ModalProps } from "antd";

const stylesObject: ModalProps["styles"] = {
  title: {
    color: "white",
  },
};

type Props = {
  open: boolean;
  onOk: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  title?: string;
  centered?: boolean;
  confirmLoading?: boolean;
  okText?: string;
  cancelText?: string;
};

export const Modal = ({
  children,
  open,
  onOk,
  onCancel,
  title,
  centered = true,
  confirmLoading,
  okText = "Ок",
  cancelText = "Отмена",
}: Props) => {
  return (
    <AntdModal
      title={title}
      centered={centered}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      styles={stylesObject}
      confirmLoading={confirmLoading}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </AntdModal>
  );
};
