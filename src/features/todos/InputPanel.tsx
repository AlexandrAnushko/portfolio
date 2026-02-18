import { Input } from "antd";
import { Button } from "@/shared/components/Button";
import { ChangeEvent } from "react";

const { TextArea } = Input;

type Props = {
  text: string;
  setText: (text: string) => void;
  handleAdd: () => void;
  handleShowDeleteModal: (show: boolean) => void;
};

export const InputPanel = ({
  text,
  setText,
  handleAdd,
  handleShowDeleteModal,
}: Props) => {
  const handleDeleteAll = () => {
    handleShowDeleteModal(true);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex gap-2 mb-4">
      <TextArea
        rows={3}
        placeholder="Add task..."
        value={text}
        onChange={onChange}
        onPressEnter={handleAdd}
      />
      <div className="flex flex-col max-w-[14%] gap-2">
        <Button onClick={handleAdd} text="Add" textTransform="normal-case" />
        <Button
          onClick={handleDeleteAll}
          text="Delete All"
          mode="secondary"
          textTransform="normal-case"
        />
      </div>
    </div>
  );
};
