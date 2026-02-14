import { Button } from "@/shared/components/antd/Button";
import { Checkbox, Table, TableColumnsType } from "antd";
import { Todo } from "./types";
import { startTransition } from "react";
import { deleteTodo, toggleTodo } from "@/app/actions/todos";
import { formatDate } from "@/shared/utils/formatDate";
import { Pencil, Trash2 } from "lucide-react";
import { createStaticStyles } from "antd-style";
import styles from "./TodoTable.module.css";

type Props = {
  todos: Todo[];
  selectedDate: string;
  isShowAll: boolean;
  loadTodos: (selectedDate: string) => void;
  setEditingTodo: (item: Todo | null) => void;
  setEditText: (text: string) => void;
  loadAllTodos: () => void;
};

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `,
}));

export const TodoTable = ({
  todos,
  selectedDate,
  isShowAll,
  loadTodos,
  loadAllTodos,
  setEditingTodo,
  setEditText,
}: Props) => {
  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTodo(id);
      if (isShowAll) {
        loadAllTodos();
      } else {
        loadTodos(selectedDate);
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);
      if (isShowAll) {
        loadAllTodos();
      } else {
        loadTodos(selectedDate);
      }
    });
  };

  const columns: TableColumnsType<Todo> = [
    {
      key: "task",
      render: (item, _, index) => (
        <div className="flex items-center gap-3 w-full border rounded-xl p-2 bg-amber-100">
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
            {`${index + 1}) ${item.text}`}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setEditingTodo(item);
                setEditText(item.text);
              }}
              icon={<Pencil color="green" />}
              shape="round"
              className="min-w-10 min-h-10"
              color="lightGreen"
              height=""
            />
            <Button
              icon={<Trash2 color="white" />}
              shape="round"
              className="min-w-10 min-h-10"
              color="lightRed"
              height=""
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ),
    },
    ...(isShowAll
      ? [
          {
            title: "Дата",
            dataIndex: "date",
            render: (d: string) => formatDate(d),
            width: 120,
          },
        ]
      : []),
  ];
  return (
    <Table
      dataSource={todos}
      columns={columns}
      rowKey="id"
      className={styles["todo-table"]}
      classNames={classNames}
    />
  );
};
