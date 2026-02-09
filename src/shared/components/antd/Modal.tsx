import { Modal as AntdModal } from "antd";
import type { ModalProps } from "antd";

const stylesObject: ModalProps["styles"] = {
  title: {
    color: "white",
  },
};

type Props = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onOk: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  centered?: boolean;
};

export const Modal = ({
  children,
  title,
  open,
  onOk,
  onCancel,
  centered = true,
}: Props) => {
  return (
    <AntdModal
      title={title}
      centered={centered}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      styles={stylesObject}
    >
      {children}
    </AntdModal>
  );
};
