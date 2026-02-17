import { Button } from "@/shared/components/antd/Button";
import { Checkbox, Table, TableColumnsType } from "antd";
import { Todo } from "./types";
import { startTransition } from "react";
import { deleteTodoById, toggleTodo } from "@/app/actions/todos";
import { formatDate } from "@/shared/utils/formatDate";
import { Pencil, Trash2 } from "lucide-react";
import { createStaticStyles } from "antd-style";
import styles from "./TodoTable.module.css";

type Props = {
  userId: string;
  todos: Todo[];
  isShowAll: boolean;
  loadTodos: () => void;
  setEditingTodo: (item: Todo | null) => void;
  setEditText: (text: string) => void;
};

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `,
}));

export const TodoTable = ({
  userId,
  todos,
  isShowAll,
  loadTodos,
  setEditingTodo,
  setEditText,
}: Props) => {
  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTodo(userId, id, isShowAll);
      loadTodos();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTodoById(userId, id, isShowAll);
      loadTodos();
    });
  };

  const columns: TableColumnsType<Todo> = [
    {
      key: "task",
      title: "Task List",
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
            title: "Date",
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
