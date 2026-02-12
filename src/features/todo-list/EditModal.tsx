import { Modal } from "@/shared/components/antd/Modal";
import { Input } from "antd";
import { Todo } from "./types";

type Props = {
  editText: string;
  editingTodo: Todo | null;
  setEditingTodo: (item: Todo | null) => void;
  setEditText: (text: string) => void;
  handleSaveEdit: () => void;
};

export const EditModal = ({
  editText,
  editingTodo,
  setEditingTodo,
  setEditText,
  handleSaveEdit,
}: Props) => {
  return (
    <Modal
      title="Изменить задачу"
      open={!!editingTodo}
      onOk={handleSaveEdit}
      onCancel={() => setEditingTodo(null)}
    >
      <Input
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onPressEnter={handleSaveEdit}
      />
    </Modal>
  );
};
