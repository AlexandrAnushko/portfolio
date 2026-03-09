import { Button } from "@/shared/components/antd/Button";
import { Checkbox, Table, TableColumnsType } from "antd";
import { Todo } from "../types/types";
import { formatDate } from "@/shared/utils/formatDate";
import { Pencil, Trash2 } from "lucide-react";
import { createStaticStyles } from "antd-style";
import styles from "./TodoTable.module.css";
import { TodoTableSkeleton } from "../skeletons/TodoTableSkeleton";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

type Props = {
  todos: Todo[];
  isShowAll: boolean;
  isPending: boolean;
  pagination: { current: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
  setEditingTodo: (item: Todo | null) => void;
};

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `,
}));

export const TodoTable = ({
  todos,
  isShowAll,
  isPending,
  pagination,
  onPaginationChange,
  handleToggle,
  handleDelete,
  setEditingTodo,
}: Props) => {
  const isMd = useMediaQuery("(min-width: 768px)");

  const columns: TableColumnsType<Todo> = [
    {
      key: "task",
      title: "Task List",
      render: (item, _, index) => (
        <div className="flex items-center gap-3 w-full border rounded-xl p-2 bg-amber-100 min-w-0">
          <Checkbox
            checked={item.done}
            disabled={isPending}
            onChange={() => handleToggle(item.id)}
          />

          <div
            className="min-w-0"
            style={{
              flex: 1,
              textDecoration: item.done ? "line-through" : "none",
              opacity: item.done ? 0.6 : 1,
            }}
          >
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {`${(pagination.current - 1) * pagination.pageSize + index + 1}) ${item.text}`}
            </div>
            {isShowAll && (
              <div className="text-xs text-blue-600 mt-0.5 md:hidden">
                {formatDate(item.date)}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Button
              onClick={() => {
                setEditingTodo(item);
              }}
              disabled={isPending}
              icon={<Pencil color="green" />}
              shape="round"
              className="min-w-10 min-h-10"
              color="lightGreen"
              height=""
            />
            <Button
              onClick={() => handleDelete(item.id)}
              disabled={isPending}
              icon={<Trash2 color="white" />}
              shape="round"
              className="min-w-10 min-h-10"
              color="lightRed"
              height=""
            />
          </div>
        </div>
      ),
    },
    ...(isShowAll && isMd
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

  return isPending && todos.length === 0 ? (
    <TodoTableSkeleton />
  ) : (
    <Table
      dataSource={todos}
      columns={columns}
      rowKey="id"
      className={styles["todo-table"]}
      classNames={classNames}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        onChange: onPaginationChange,
      }}
    />
  );
};
