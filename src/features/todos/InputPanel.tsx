import { Input } from "antd";
import { Button } from "@/shared/components/Button";
import { ChangeEvent, KeyboardEvent } from "react";
import { DateAndMode } from "./types";

const { TextArea } = Input;

type Props = {
  text: string;
  setText: (text: string) => void;
  handleAdd: () => void;
  handleShowDeleteModal: (show: boolean) => void;
  dateAndMode: DateAndMode;
  setShowCalendar: (show: boolean) => void;
};

export const InputPanel = ({
  text,
  setText,
  handleAdd,
  handleShowDeleteModal,
  dateAndMode,
  setShowCalendar,
}: Props) => {
  const handleDeleteAll = () => {
    handleShowDeleteModal(true);
  };
  const showCalendar = () => {
    setShowCalendar(true);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <TextArea
        rows={3}
        placeholder="Add task..."
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className="flex flex-row justify-between sm:flex-col w-full sm:max-w-[18%] lg:max-w-[14%]">
        <Button
          onClick={showCalendar}
          text={
            dateAndMode.isShowAll
              ? "All tasks"
              : dateAndMode.selectedDate.slice(0, 10)
          }
          textTransform="normal-case"
          className="sm:hidden"
        />
        <div className="flex flex-row sm:flex-col gap-2">
          <Button onClick={handleAdd} text="Add" textTransform="normal-case" />
          <Button
            onClick={handleDeleteAll}
            text="Delete All"
            mode="secondary"
            textTransform="normal-case"
          />
        </div>
      </div>
    </div>
  );
};
