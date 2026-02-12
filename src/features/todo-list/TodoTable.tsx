import { Button } from "@/shared/components/antd/Button";
import { Checkbox, Table, TableColumnsType } from "antd";
import { Todo } from "./types";
import { startTransition } from "react";
import { deleteTodo, toggleTodo } from "@/app/actions/todos";
import { formatDate } from "@/shared/utils/formatDate";

type Props = {
  todos: Todo[];
  selectedDate: string;
  loadTodos: (selectedDate: string) => void;
  setEditingTodo: (item: Todo | null) => void;
  setEditText: (text: string) => void;
};

export const TodoTable = ({
  todos,
  selectedDate,
  loadTodos,
  setEditingTodo,
  setEditText,
}: Props) => {
  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTodo(id);
      loadTodos(selectedDate);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);
      loadTodos(selectedDate);
    });
  };

  const columns: TableColumnsType<Todo> = [
    {
      title: "Задача",
      key: "task",
      render: (item) => (
        <div className="flex items-center gap-3 w-full">
          <Checkbox
            checked={item.done}
            onChange={() => handleToggle(item.id)}
          />

          <div
            style={{
              flex: 1,
              textDecoration: item.done ? "line-through" : "none",
              opacity: item.done ? 0.6 : 1,
            }}
          >
            {item.text}
          </div>

          <div className="flex gap-2">
            <Button
              text="Изменить"
              color="green"
              onClick={() => {
                setEditingTodo(item);
                setEditText(item.text);
              }}
            />
            <Button
              text="Удалить"
              color="red"
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Дата",
      dataIndex: "date",
      render: (d) => formatDate(d),
      width: 120,
    },
  ];
  return (
    <Table
      dataSource={todos}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};
