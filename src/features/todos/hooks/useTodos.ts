"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  addTodo,
  deleteTodoById,
  deleteTodos,
  getAllTodos,
  getTodosByDate,
  toggleTodo,
  updateTodo,
} from "@/app/actions/todos";
import { DateAndMode, Todo } from "../types/types";

type UseTodosParams = {
  userId: string;
  activeFolderId: string;
  dateAndMode: DateAndMode;
};

export const useTodos = ({
  userId,
  activeFolderId,
  dateAndMode,
}: UseTodosParams) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isPending, startTransition] = useTransition();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const fetchTodos = async () => {
    const data = dateAndMode.isShowAll
      ? await getAllTodos(userId, activeFolderId)
      : await getTodosByDate(userId, dateAndMode.selectedDate, activeFolderId);
    setTodos(data);
  };

  useEffect(() => {
    if (!userId || !activeFolderId) return;
    startTransition(() => fetchTodos());
    setPagination((prev) => ({ ...prev, current: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAndMode, userId, activeFolderId]);

  const handleAdd = (text: string) => {
    if (!text.trim() || !activeFolderId) return;

    const optimisticTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      done: false,
      date: dateAndMode.selectedDate,
      folderId: activeFolderId,
    };

    setTodos((prev) => {
      const newTodos = [...prev, optimisticTodo];
      const lastPage = Math.ceil(newTodos.length / pagination.pageSize);
      setPagination((p) => ({ ...p, current: lastPage }));
      return newTodos;
    });

    startTransition(async () => {
      try {
        await addTodo(userId, text, dateAndMode.selectedDate, activeFolderId);
        await fetchTodos();
      } catch {
        setTodos((prev) => prev.filter((t) => t.id !== optimisticTodo.id));
        toast.error("Failed to add todo. Please try again.");
      }
    });
  };

  const handleSaveEdit = (editText: string, editDate: string) => {
    if (!editingTodo) return;

    startTransition(async () => {
      try {
        await updateTodo(
          userId,
          editingTodo.id,
          editText,
          editDate,
          activeFolderId,
        );
        await fetchTodos();
        setEditingTodo(null);
      } catch {
        toast.error("Failed to update todo. Please try again.");
      }
    });
  };

  const handleToggle = (id: string) => {
    const prevTodos = [...todos];
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
    startTransition(async () => {
      try {
        await toggleTodo(userId, id, dateAndMode.selectedDate, activeFolderId);
        await fetchTodos();
      } catch {
        setTodos(prevTodos);
        toast.error("Failed to toggle todo. Please try again.");
      }
    });
  };

  const handleDelete = (id: string) => {
    const prevTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));
    startTransition(async () => {
      try {
        await deleteTodoById(
          userId,
          id,
          dateAndMode.selectedDate,
          activeFolderId,
        );
        await fetchTodos();
      } catch {
        setTodos(prevTodos);
        toast.error("Failed to delete todo. Please try again.");
      }
    });
  };

  const deleteAllTodos = async () => {
    const prevTodos = [...todos];
    setTodos([]);
    startTransition(async () => {
      try {
        await deleteTodos(
          userId,
          activeFolderId,
          dateAndMode.isShowAll ? undefined : dateAndMode.selectedDate,
        );
        await fetchTodos();
      } catch {
        setTodos(prevTodos);
        toast.error("Failed to delete todos. Please try again.");
      }
    });
  };

  return {
    todos,
    editingTodo,
    setEditingTodo,
    isPending,
    pagination,
    setPagination,
    handleAdd,
    handleSaveEdit,
    handleToggle,
    handleDelete,
    deleteAllTodos,
  };
};
