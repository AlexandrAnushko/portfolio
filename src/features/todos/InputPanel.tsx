import { Button } from "@/shared/components/Button";
import { Input } from "antd";
import { startTransition, useState } from "react";
import { addTodo } from "../../app/actions/todos";
import { DateAndMode } from "./types";

const { TextArea } = Input;

type Props = {
  userId: string;
  dateAndMode: DateAndMode;
  loadTodos: () => void;
  handleShowDeleteModal: (show: boolean) => void;
};

export const InputPanel = ({
  userId,
  dateAndMode,
  loadTodos,
  handleShowDeleteModal,
}: Props) => {
  const [newTodo, setNewTodo] = useState("");
  const handleAdd = () => {
    startTransition(async () => {
      await addTodo(userId, newTodo, dateAndMode);
      loadTodos();
      setNewTodo("");
    });
  };
  const handleDeleteAll = () => {
    handleShowDeleteModal(true);
  };
  return (
    <div className="flex gap-2 mb-4">
      <TextArea
        rows={3}
        placeholder="Add task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
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
