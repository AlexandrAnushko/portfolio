"use client";

import { useEffect, useState, useTransition } from "react";
import type { Dayjs } from "dayjs";

import {
  deleteTodos,
  getAllTodos,
  getTodosByDate,
} from "../../app/actions/todos";
import { DateAndMode, Todo } from "@/features/todos/types";
import { Calendar } from "./Calendar";
import { InputPanel } from "./InputPanel";
import { TodoTable } from "./TodoTable";
import { EditModal } from "./EditModal";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { useAuth } from "@/shared/hooks/useAuth";

const initialDate = new Date().toISOString().slice(0, 10);

export default function TodoClient() {
  const { userId } = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dateAndMode, setDateAndMode] = useState<DateAndMode>({
    selectedDate: initialDate,
    isShowAll: false,
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAndMode]);

  if (!userId) return null;

  const loadTodos = () => {
    startTransition(async () => {
      let data: Todo[] = [];
      if (dateAndMode.isShowAll) {
        data = await getAllTodos(userId);
      } else {
        data = await getTodosByDate(userId, dateAndMode.selectedDate);
      }

      setTodos(data);
    });
  };

  const onSelect = (date: Dayjs) => {
    const iso = date.format("YYYY-MM-DD");
    setDateAndMode({ selectedDate: iso, isShowAll: false });
  };

  const onShowAll = () => {
    setDateAndMode({ ...dateAndMode, isShowAll: true });
  };

  const deleteAllTodos = async () => {
    await deleteTodos(
      userId,
      dateAndMode.isShowAll ? undefined : dateAndMode.selectedDate,
    );
    loadTodos();
  };

  return (
    <>
      <div className="flex gap-10 p-4">
        <div className="w-75">
          <Calendar onSelect={onSelect} onShowAll={onShowAll} />
        </div>

        <div className="flex flex-col max-w-200 min-w-200">
          <InputPanel
            userId={userId}
            dateAndMode={dateAndMode}
            loadTodos={loadTodos}
            handleShowDeleteModal={setShowDeleteModal}
          />

          <TodoTable
            userId={userId}
            todos={todos}
            loadTodos={loadTodos}
            setEditingTodo={setEditingTodo}
            setEditText={setEditText}
            isShowAll={dateAndMode.isShowAll}
          />
        </div>
      </div>

      <EditModal
        userId={userId}
        editText={editText}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        setEditText={setEditText}
        loadTodos={loadTodos}
        isShowAll={dateAndMode.isShowAll}
      />
      <DeleteModal
        text={
          dateAndMode.isShowAll
            ? "Are you sure you want to delete all user tasks for all time?"
            : "Are you sure you want to delete all tasks for the specified date?"
        }
        setOpen={setShowDeleteModal}
        action={deleteAllTodos}
        open={showDeleteModal}
      />
    </>
  );
}
