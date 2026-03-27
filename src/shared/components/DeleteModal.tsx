"use client";
import { useState } from "react";
import { Modal } from "@/shared/components/Modal";
import { Button } from "./Button";

type Props = {
  text: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  action: () => Promise<void>;
};

export const DeleteModal = ({ text, open, setOpen, action }: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = async () => {
    setConfirmLoading(true);
    await action();
    setConfirmLoading(false);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal open={open} onCancel={handleCancel}>
      <h2 className="text-white text-lg pr-2">{text}</h2>
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          onClick={handleOk}
          text="Ok"
          size="small"
          isLoading={confirmLoading}
        />

        <Button
          onClick={handleCancel}
          text="Cancel"
          mode="secondary"
          size="small"
        />
      </div>
    </Modal>
  );
};
