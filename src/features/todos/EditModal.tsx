import { Modal } from "@/shared/components/antd/Modal";
import { Input } from "antd";
import { Todo } from "./types";
import { useState } from "react";
import { Calendar } from "./Calendar";
import dayjs, { Dayjs } from "dayjs";
import { Button } from "@/shared/components/Button";

const { TextArea } = Input;

type Props = {
  editingTodo: Todo;
  isShowAll: boolean;
  handleSaveEdit: (text: string, date: string) => void;
  setEditingTodo: (item: Todo | null) => void;
};

export const EditModal = ({
  editingTodo,
  handleSaveEdit,
  setEditingTodo,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [editText, setEditText] = useState(editingTodo.text);
  const [editDate, setEditDate] = useState(editingTodo.date);

  const onSelect = (date: Dayjs) => {
    const iso = date.format("YYYY-MM-DD");
    setEditDate(iso);
  };

  const onCancel = () => {
    setEditDate(editingTodo?.date);
    setShowCalendar(false);
  };

  return (
    <Modal
      title="Edit task"
      open={!!editingTodo}
      onOk={() => handleSaveEdit(editText, editDate)}
      onCancel={() => setEditingTodo(null)}
    >
      <TextArea
        rows={3}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onPressEnter={() => handleSaveEdit(editText, editDate)}
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
        <Calendar onSelect={onSelect} value={dayjs(editDate)} />
      </Modal>
    </Modal>
  );
};
