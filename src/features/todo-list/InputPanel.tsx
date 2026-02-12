import { Button } from "@/shared/components/antd/Button";
import { Input } from "antd";
import { startTransition, useState } from "react";
import { addTodo } from "../../app/actions/todos";

type Props = {
  selectedDate: string;
  loadTodos: (selectedDate: string) => void;
};

export const InputPanel = ({ selectedDate, loadTodos }: Props) => {
  const [newTodo, setNewTodo] = useState("");
  const handleAdd = () => {
    startTransition(async () => {
      await addTodo(newTodo, selectedDate);
      loadTodos(selectedDate);
      setNewTodo("");
    });
  };
  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Добавить задачу..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onPressEnter={handleAdd}
      />
      <Button onClick={handleAdd} text="Добавить" color="blue" />
    </div>
  );
};
