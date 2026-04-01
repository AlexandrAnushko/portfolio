import { KeyboardEvent } from "react";
import { parseISO } from "date-fns";
import { Todo } from "../types/types";
import { useState } from "react";
import { Calendar } from "./Calendar";
import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/Button";
import { Textarea } from "@/shared/components/Textarea";

type Props = {
  editingTodo: Todo;
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

  const onSelect = (date: Date) => {
    const iso = date.toISOString();
    setEditDate(iso);
  };

  const onCalendarCancel = () => {
    setEditDate(editingTodo.date);
    setShowCalendar(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit(editText, editDate);
    }
  };

  return (
    <Modal
      title="Edit task"
      open={!!editingTodo}
      onCancel={() => setEditingTodo(null)}
    >
      <Textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setShowCalendar(true)}
          text="Edit date"
          textTransform="normal-case"
          size="small"
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            onClick={() => handleSaveEdit(editText, editDate)}
            text="Ok"
            size="small"
          />

          <Button
            onClick={() => setEditingTodo(null)}
            text="Cancel"
            mode="secondary"
            size="small"
          />
        </div>
      </div>
      {showCalendar && (
        <Modal
          title="Edit task date"
          open={showCalendar}
          onCancel={onCalendarCancel}
        >
          <Calendar onSelect={onSelect} value={parseISO(editDate)} />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="submit"
              onClick={() => setShowCalendar(false)}
              text="Ok"
              size="small"
            />

            <Button
              onClick={onCalendarCancel}
              text="Cancel"
              mode="secondary"
              size="small"
            />
          </div>
        </Modal>
      )}
    </Modal>
  );
};
