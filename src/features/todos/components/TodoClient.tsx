"use client";

import { useState } from "react";
import { format } from "date-fns";
import { TodoFolder } from "@/features/todos/types/types";
import { Calendar } from "./Calendar";
import { TaskInput } from "./tasks/TaskInput";
import { TaskList } from "./tasks/TaskList";
import { EditModal } from "./EditModal";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/Button";
import { TabsFolders } from "./TabsFolders";
import { useDateMode } from "../hooks/useDateMode";
import { useTodaySuccess } from "../hooks/useTodaySuccess";
import { useTodos } from "../hooks/useTodos";

type Props = {
  userId: string;
  initialFolders: TodoFolder[];
};

export default function TodoClient({ userId, initialFolders }: Props) {
  const [folders, setFolders] = useState<TodoFolder[]>(initialFolders);
  const [activeFolderId, setActiveFolderId] = useState<string>(
    initialFolders[0]?.id ?? "",
  );
  const [newTodoText, setNewTodoText] = useState("");

  const {
    dateAndMode,
    setDateAndMode,
    showMobileCalendar,
    setShowMobileCalendar,
  } = useDateMode();

  const {
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
  } = useTodos({ userId, activeFolderId, dateAndMode });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useTodaySuccess({ todos, dateAndMode });

  if (!userId) return null;

  const onAdd = () => {
    handleAdd(newTodoText);
    setNewTodoText("");
  };

  const onSelect = (date: Date) => {
    const iso = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    setDateAndMode({ selectedDate: iso, isShowAll: false });
    if (showMobileCalendar) setShowMobileCalendar(false);
  };

  const onShowAll = () => {
    setDateAndMode({ ...dateAndMode, isShowAll: true });
    if (showMobileCalendar) setShowMobileCalendar(false);
  };

  return (
    <main
      id="todos-page"
      className="flex flex-col h-full w-full max-w-7xl mx-auto px-8 pt-24 pb-20 animate-in fade-in duration-500"
    >
      <TabsFolders
        folders={folders}
        activeFolderId={activeFolderId}
        onFolderChange={setActiveFolderId}
        onFolderCreated={(folder) => setFolders((prev) => [...prev, folder])}
        onFolderRenamed={(folder) =>
          setFolders((prev) =>
            prev.map((f) => (f.id === folder.id ? folder : f)),
          )
        }
        onFolderDeleted={(folderId) =>
          setFolders((prev) => {
            const filtered = prev.filter((f) => f.id !== folderId);
            if (activeFolderId === folderId) {
              setActiveFolderId(filtered[0]?.id ?? "");
            }
            return filtered;
          })
        }
      />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="hidden xl:flex w-full lg:w-80 shrink-0 flex-col gap-6">
          <div className="bg-dark-bg border border-white/10 rounded-2xl p-6">
            <Calendar
              onSelect={onSelect}
              value={new Date(dateAndMode.selectedDate)}
            />
          </div>
          {!dateAndMode.isShowAll && (
            <Button
              onClick={onShowAll}
              text="Show tasks for all time"
              mode="dark"
              textTransform="normal-case"
              rounded="rounded-xl"
              size="xl"
            />
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-6 bg-dark-bg border border-white/10 rounded-2xl p-6 shadow-xl">
          <TaskInput
            text={newTodoText}
            setText={setNewTodoText}
            handleAdd={onAdd}
            handleShowDeleteModal={setShowDeleteModal}
            dateAndMode={dateAndMode}
            setShowCalendar={setShowMobileCalendar}
            isPending={isPending}
          />
          <TaskList
            tasks={todos}
            isShowAll={dateAndMode.isShowAll}
            isPending={isPending}
            pagination={pagination}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            setEditingTodo={setEditingTodo}
            setPagination={setPagination}
          />
        </div>
      </div>

      {editingTodo && (
        <EditModal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          handleSaveEdit={handleSaveEdit}
        />
      )}
      {showMobileCalendar && (
        <Modal
          open={showMobileCalendar}
          onCancel={() => setShowMobileCalendar(false)}
        >
          <Calendar
            onSelect={onSelect}
            value={new Date(dateAndMode.selectedDate)}
          />
          {!dateAndMode.isShowAll && (
            <Button
              onClick={onShowAll}
              text="Show tasks for all time"
              mode="dark"
              textTransform="normal-case"
              rounded="rounded-xl"
              className="mt-2"
            />
          )}
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
    </main>
  );
}
