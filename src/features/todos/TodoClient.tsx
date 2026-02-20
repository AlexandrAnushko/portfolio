"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { toast } from "sonner";
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
import { Modal } from "@/shared/components/antd/Modal";

const initialDate = new Date().toISOString();

export default function TodoClient({ userId }: { userId: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [dateAndMode, setDateAndMode] = useState<DateAndMode>({
    selectedDate: initialDate,
    isShowAll: false,
  });

  const [isPending, startTransition] = useTransition();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const isTodaySuccess = useRef(false);

  const loadTodos = () => {
    if (!userId) return;

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

  useEffect(() => {
    loadTodos();
    setPagination((prev) => ({ ...prev, current: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAndMode, userId]);

  // effect checks if you done all today tasks
  useEffect(() => {
    if (
      !dateAndMode.isShowAll &&
      !!todos.length &&
      dayjs().isSame(dateAndMode.selectedDate, "day") &&
      !isTodaySuccess.current
    ) {
      if (todos.every((t) => t.done)) {
        isTodaySuccess.current = true;
        toast.success("Well done! You completed all the tasks for today!");
      }
    } else if (isTodaySuccess.current) {
      if (!todos.every((t) => t.done)) {
        isTodaySuccess.current = false;
      }
    }
  }, [todos, dateAndMode]);

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

    setTodos((prev) => {
      const newTodos = [...prev, optimisticTodo];
      const lastPage = Math.ceil(newTodos.length / pagination.pageSize);
      setPagination((p) => ({ ...p, current: lastPage }));
      return newTodos;
    });
    setNewTodoText("");

    startTransition(async () => {
      try {
        await addTodo(userId, newTodoText, dateAndMode.selectedDate);
        fetchTodos();
      } catch {
        setTodos((prev) => prev.filter((t) => t.id !== optimisticTodo.id));
      }
    });
  };

  const handleSaveEdit = (editText: string, editDate: string) => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(userId, editingTodo.id, editText, editDate);
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
        await toggleTodo(userId, id, dateAndMode.selectedDate);
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
        await deleteTodoById(userId, id, dateAndMode.selectedDate);
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
    const iso = date.toDate().toISOString();
    setDateAndMode({ selectedDate: iso, isShowAll: false });
  };

  const onSelectMobile = (date: Dayjs) => {
    const iso = date.toDate().toISOString();
    setDateAndMode({ selectedDate: iso, isShowAll: false });
    setShowMobileCalendar(false);
  };

  const onShowAll = () => {
    setDateAndMode({ ...dateAndMode, isShowAll: true });
  };

  const onShowAllMobile = () => {
    setDateAndMode({ ...dateAndMode, isShowAll: true });
    setShowMobileCalendar(false);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 p-4 justify-center items-center lg:items-start w-full">
        <div className="hidden xl:block w-75">
          <Calendar onSelect={onSelect} onShowAll={onShowAll} />
        </div>

        <div className="flex flex-col w-full max-w-200 xl:min-w-200">
          <InputPanel
            text={newTodoText}
            setText={setNewTodoText}
            handleAdd={handleAdd}
            handleShowDeleteModal={setShowDeleteModal}
            dateAndMode={dateAndMode}
            setShowCalendar={setShowMobileCalendar}
          />

          <TodoTable
            todos={todos}
            isShowAll={dateAndMode.isShowAll}
            isPending={isPending}
            pagination={pagination}
            onPaginationChange={(page, pageSize) =>
              setPagination({ current: page, pageSize })
            }
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
      {showMobileCalendar && (
        <Modal
          open={showMobileCalendar}
          onCancel={() => setShowMobileCalendar(false)}
        >
          <Calendar onSelect={onSelectMobile} onShowAll={onShowAllMobile} />
        </Modal>
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
