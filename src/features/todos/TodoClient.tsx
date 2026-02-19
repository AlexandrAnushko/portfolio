"use client";

import { useEffect, useState, useTransition } from "react";
import type { Dayjs } from "dayjs";

import {
  addTodo,
  deleteTodoById,
  deleteTodos,
  getAllTodos,
  getTodosByDate,
  toggleTodo,
  updateTodo,
} from "../../app/actions/todos";
import { DateAndMode, Todo } from "@/features/todos/types";
import { Calendar } from "./Calendar";
import { InputPanel } from "./InputPanel";
import { TodoTable } from "./TodoTable";
import { EditModal } from "./EditModal";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { TODOS_TAGS } from "@/shared/constants/tags";

const initialDate = new Date().toISOString().slice(0, 10);

export default function TodoClient({ userId }: { userId: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dateAndMode, setDateAndMode] = useState<DateAndMode>({
    selectedDate: initialDate,
    isShowAll: false,
  });

  const [isPending, startTransition] = useTransition();

  const loadTodos = () => {
    if (!userId) return;

    startTransition(async () => {
      let data: Todo[] = [];
      if (dateAndMode.isShowAll) {
        data = await getAllTodos(userId);
      } else {
        console.log(
          "`${TODOS_TAGS.BY_DATE}-${userId}-${date}`",
          `${TODOS_TAGS.BY_DATE}-${userId}-${dateAndMode.selectedDate}`,
        );

        data = await getTodosByDate(userId, dateAndMode.selectedDate);
      }

      setTodos(data);
    });
  };

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAndMode, userId]);

  if (!userId) return null;

  const fetchTodos = async () => {
    const data = dateAndMode.isShowAll
      ? await getAllTodos(userId)
      : await getTodosByDate(userId, dateAndMode.selectedDate);
    setTodos(data);
  };

  const handleAdd = () => {
    if (!newTodoText.trim()) return;

    const optimisticTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      done: false,
      date: dateAndMode.selectedDate,
    };

    setTodos((prev) => [...prev, optimisticTodo]);
    setNewTodoText("");

    startTransition(async () => {
      try {
        await addTodo(userId, newTodoText, dateAndMode);
        fetchTodos();
      } catch {
        setTodos((prev) => prev.filter((t) => t.id !== optimisticTodo.id));
      }
    });
  };

  const handleSaveEdit = (editText: string, editDate: string) => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(
        userId,
        editingTodo.id,
        editText,
        dateAndMode.isShowAll,
        editDate,
      );
      fetchTodos();
      setEditingTodo(null);
    });
  };

  const handleToggle = (id: string) => {
    const prevTodos = [...todos];
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
    startTransition(async () => {
      try {
        await toggleTodo(userId, id, dateAndMode);
        fetchTodos();
      } catch {
        setTodos(prevTodos);
      }
    });
  };

  const handleDelete = (id: string) => {
    const prevTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));
    startTransition(async () => {
      try {
        await deleteTodoById(userId, id, dateAndMode);
        fetchTodos();
      } catch {
        setTodos(prevTodos);
      }
    });
  };

  const deleteAllTodos = async () => {
    setTodos([]);
    startTransition(async () => {
      await deleteTodos(
        userId,
        dateAndMode.isShowAll ? undefined : dateAndMode.selectedDate,
      );
      fetchTodos();
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
            text={newTodoText}
            setText={setNewTodoText}
            handleAdd={handleAdd}
            handleShowDeleteModal={setShowDeleteModal}
          />

          <TodoTable
            todos={todos}
            isShowAll={dateAndMode.isShowAll}
            isPending={isPending}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            setEditingTodo={setEditingTodo}
          />
        </div>
      </div>

      {editingTodo && (
        <EditModal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          handleSaveEdit={handleSaveEdit}
          isShowAll={dateAndMode.isShowAll}
        />
      )}
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
