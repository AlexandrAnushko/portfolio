import { Modal } from "@/shared/components/antd/Modal";
import { Input } from "antd";
import { Todo } from "./types";
import { useState, useTransition } from "react";
import { Calendar } from "./Calendar";
import dayjs, { Dayjs } from "dayjs";
import { updateTodo } from "@/app/actions/todos";
import { Button } from "@/shared/components/Button";

const { TextArea } = Input;

type Props = {
  userId: string;
  editText: string;
  editingTodo: Todo | null;
  isShowAll: boolean;
  setEditingTodo: (item: Todo | null) => void;
  setEditText: (text: string) => void;
  loadTodos: () => void;
};

export const EditModal = ({
  userId,
  editText,
  editingTodo,
  isShowAll,
  setEditingTodo,
  setEditText,
  loadTodos,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(editingTodo?.date);

  const onSelect = (date: Dayjs) => {
    const iso = date.format("YYYY-MM-DD");
    setDate(iso);
  };

  const handleSaveEdit = () => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(userId, editingTodo.id, editText, isShowAll, date);
      loadTodos();
      setEditingTodo(null);
    });
  };

  const onCancel = () => {
    setDate(editingTodo?.date);
    setShowCalendar(false);
  };

  return (
    <Modal
      title="Edit task"
      open={!!editingTodo}
      onOk={handleSaveEdit}
      onCancel={() => setEditingTodo(null)}
    >
      <TextArea
        rows={3}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onPressEnter={handleSaveEdit}
      />
      <Button
        onClick={() => setShowCalendar(true)}
        text="Edit date"
        textTransform="normal-case"
        extra="mt-2 max-w-[30%]"
      />
      <Modal
        title="Edit task date"
        open={showCalendar}
        onOk={() => setShowCalendar(false)}
        onCancel={onCancel}
      >
        <Calendar onSelect={onSelect} value={dayjs(date)} />
      </Modal>
    </Modal>
  );
};
