import { Button } from "@/shared/components/Button";
import { ChangeEvent, KeyboardEvent } from "react";
import { DateAndMode } from "../types/types";

type Props = {
  text: string;
  isPending: boolean;
  dateAndMode: DateAndMode;
  setText: (text: string) => void;
  handleAdd: () => void;
  handleShowDeleteModal: (show: boolean) => void;
  setShowCalendar: (show: boolean) => void;
};
export const TaskInput = ({
  text,
  isPending,
  dateAndMode,
  setText,
  handleAdd,
  handleShowDeleteModal,
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
    <div className="flex flex-col gap-4">
      <textarea
        placeholder="Add task..."
        rows={3}
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full bg-dark-bg-hover border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
      />
      <div className="flex flex-row justify-between items-center">
        <h3 className="hidden xl:block text-xl font-bold text-white tracking-wide">
          TASK LIST
        </h3>
        <Button
          onClick={showCalendar}
          text={
            dateAndMode.isShowAll
              ? "All tasks"
              : dateAndMode.selectedDate.slice(0, 10)
          }
          textTransform="normal-case"
          className="xl:hidden"
        />
        <div className="flex flex-row gap-2 self-end">
          <Button
            onClick={handleAdd}
            isDisabled={isPending}
            text="Add"
            textTransform="normal-case"
          />
          <Button
            onClick={handleDeleteAll}
            isDisabled={isPending}
            text="Delete All"
            mode="danger"
            textTransform="normal-case"
          />
        </div>
      </div>
    </div>
  );
};
