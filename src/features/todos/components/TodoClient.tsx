"use client";

import { useState } from "react";
import type { Dayjs } from "dayjs";
import { TodoFolder } from "@/features/todos/types/types";
import { Calendar } from "./Calendar";
import { InputPanel } from "./InputPanel";
import { TodoTable } from "./TodoTable";
import { EditModal } from "./EditModal";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { Modal } from "@/shared/components/antd/Modal";
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

  const onSelect = (date: Dayjs) => {
    const iso = date.toDate().toISOString();
    setDateAndMode({ selectedDate: iso, isShowAll: false });
    if (showMobileCalendar) setShowMobileCalendar(false);
  };

  const onShowAll = () => {
    setDateAndMode({ ...dateAndMode, isShowAll: true });
    if (showMobileCalendar) setShowMobileCalendar(false);
  };

  return (
    <div className="flex flex-col w-full items-center h-full pb-6">
      <div className="flex flex-col items-center h-full w-full xl:w-[90%] 2xl:w-[80%] bg-gray-800 rounded-xl">
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
        <div className="flex flex-col w-full lg:flex-row justify-center items-center lg:items-start gap-6 sm:gap-8 md:gap-10 p-4">
          <div className="hidden xl:block w-75">
            <Calendar onSelect={onSelect} onShowAll={onShowAll} />
          </div>

          <div className="flex flex-col w-full max-w-200 xl:min-w-200">
            <InputPanel
              text={newTodoText}
              setText={setNewTodoText}
              handleAdd={onAdd}
              handleShowDeleteModal={setShowDeleteModal}
              dateAndMode={dateAndMode}
              setShowCalendar={setShowMobileCalendar}
              isPending={isPending}
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
          <Calendar onSelect={onSelect} onShowAll={onShowAll} />
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
    </div>
  );
}
