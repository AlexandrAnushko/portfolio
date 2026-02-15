"use client";

import { useEffect, useState, useTransition } from "react";
import type { Dayjs } from "dayjs";

import {
  getAllTodos,
  getTodosByDate,
  updateTodo,
} from "../../app/actions/todos";
import { Todo } from "@/features/todo-list/types";
import { Calendar } from "./Calendar";
import { InputPanel } from "./InputPanel";
import { TodoTable } from "./TodoTable";
import { EditModal } from "./EditModal";

type Props = { initialDate: string; initialTodos: Todo[] };
type DateAndMode = { selectedDate: string; isShowAll: boolean };

export default function TodoClient({ initialDate, initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [dateAndMode, setDateAndMode] = useState<DateAndMode>({
    selectedDate: initialDate,
    isShowAll: false,
  });

  const [isPending, startTransition] = useTransition();

  const loadTodos = () => {
    startTransition(async () => {
      let data: Todo[] = [];
      if (dateAndMode.isShowAll) {
        data = await getAllTodos();
      } else {
        data = await getTodosByDate(dateAndMode.selectedDate);
      }

      setTodos(data);
    });
  };

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAndMode]);

  const handleSaveEdit = () => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(editingTodo.id, editText);
      loadTodos();
      setEditingTodo(null);
    });
  };

  const onSelect = (date: Dayjs) => {
    const iso = date.format("YYYY-MM-DD");
    setDateAndMode({ selectedDate: iso, isShowAll: false });
  };

  const onShowAll = () => {
    setDateAndMode({ ...dateAndMode, isShowAll: true });
  };

  return (
    <>
      <div className="flex gap-10 p-4">
        <div className="w-75">
          <Calendar onSelect={onSelect} onShowAll={onShowAll} />
        </div>

        <div className="flex flex-col max-w-200 min-w-200">
          <InputPanel
            selectedDate={dateAndMode.selectedDate}
            loadTodos={loadTodos}
          />

          <TodoTable
            todos={todos}
            loadTodos={loadTodos}
            setEditingTodo={setEditingTodo}
            setEditText={setEditText}
            isShowAll={dateAndMode.isShowAll}
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
