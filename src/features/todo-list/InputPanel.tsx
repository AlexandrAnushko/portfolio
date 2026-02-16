import { Button } from "@/shared/components/antd/Button";
import { Input } from "antd";
import { startTransition, useState } from "react";
import { addTodo } from "../../app/actions/todos";

const { TextArea } = Input;

type Props = {
  selectedDate: string;
  loadTodos: () => void;
  handleShowDeleteModal: (show: boolean) => void;
};

export const InputPanel = ({
  selectedDate,
  loadTodos,
  handleShowDeleteModal,
}: Props) => {
  const [newTodo, setNewTodo] = useState("");
  const handleAdd = () => {
    startTransition(async () => {
      await addTodo(newTodo, selectedDate);
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
        placeholder="Добавить задачу..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onPressEnter={handleAdd}
      />
      <div className="flex flex-col max-w-[14%] gap-2">
        <Button onClick={handleAdd} text="Добавить" color="green" />
        <Button onClick={handleDeleteAll} text="Удалить все" color="lightRed" />
      </div>
    </div>
  );
};
