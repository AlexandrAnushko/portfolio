"use client";

import { useEffect, useState, useTransition } from "react";
import type { Dayjs } from "dayjs";

import { getTodos, getTodosByDate, updateTodo } from "../../app/actions/todos";
import { Todo } from "@/features/todo-list/types";
import { Calendar } from "./Calendar";
import { InputPanel } from "./InputPanel";
import { TodoTable } from "./TodoTable";
import { EditModal } from "./EditModal";

type Props = { initialDate: string; initialTodos: Todo[] };

export default function TodoClient({ initialDate, initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [isShowAll, setIsShowAll] = useState(false);

  const [isPending, startTransition] = useTransition();

  const loadTodos = (date: string) => {
    startTransition(async () => {
      const data = await getTodosByDate(date);
      setTodos(data);
      if (isShowAll) {
        setIsShowAll(false);
      }
    });
  };

  const loadAllTodos = () => {
    startTransition(async () => {
      const data = await getTodos();
      setTodos(data);
      setIsShowAll(true);
    });
  };

  useEffect(() => {
    loadTodos(selectedDate);
  }, [selectedDate]);

  const handleSaveEdit = () => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(editingTodo.id, editText);
      loadTodos(selectedDate);
      setEditingTodo(null);
    });
  };

  const onSelect = (date: Dayjs) => {
    const iso = date.format("YYYY-MM-DD");
    setSelectedDate(iso);
  };

  return (
    <>
      <div className="flex gap-10 p-4">
        <div className="w-75">
          <Calendar onSelect={onSelect} onShowAll={loadAllTodos} />
        </div>

        <div className="flex flex-col max-w-200 min-w-200">
          <InputPanel selectedDate={selectedDate} loadTodos={loadTodos} />

          <TodoTable
            todos={todos}
            loadTodos={loadTodos}
            setEditingTodo={setEditingTodo}
            setEditText={setEditText}
            selectedDate={selectedDate}
            isShowAll={isShowAll}
          />
        </div>
      </div>

      <EditModal
        editText={editText}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        setEditText={setEditText}
        handleSaveEdit={handleSaveEdit}
      />
    </>
  );
}
