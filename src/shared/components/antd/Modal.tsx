import { Modal as AntdModal } from "antd";
import type { ModalProps } from "antd";
import { Button } from "../Button";

const stylesObject: ModalProps["styles"] = {
  title: {
    color: "white",
    fontSize: "18px",
  },
};

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
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
  onCancel,
  onOk,
  title,
  centered = true,
  confirmLoading,
  okText = "Ok",
  cancelText = "Cancel",
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
      footer={(_) => (
        <div className="flex justify-end gap-2">
          {onOk && (
            <Button
              key="submit"
              type="submit"
              onClick={onOk}
              text={okText}
              size="small"
            />
          )}
          <Button
            key="back"
            onClick={onCancel}
            text={cancelText}
            mode="secondary"
            size="small"
          />
        </div>
      )}
    >
      {children}
    </AntdModal>
  );
};
