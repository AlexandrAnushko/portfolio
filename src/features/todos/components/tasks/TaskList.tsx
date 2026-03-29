import { Todo } from "../../types/types";
import { Pagination } from "./Pagination";
import { TaskCard } from "./TaskCard";

type Props = {
  tasks: Todo[];
  isShowAll: boolean;
  isPending: boolean;
  pagination: { current: number; pageSize: number };
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
  setEditingTodo: (item: Todo | null) => void;
  setPagination: (pag: { current: number; pageSize: number }) => void;
};

export const TaskList = ({
  tasks,
  isShowAll,
  isPending,
  pagination,
  handleToggle,
  handleDelete,
  setEditingTodo,
  setPagination,
}: Props) => {
  const { current, pageSize } = pagination;
  const paginatedTodos = tasks.slice(
    (current - 1) * pageSize,
    current * pageSize,
  );

  return (
    <>
      <div className="flex-1 min-h-100">
        <h3 className="block xl:hidden text-xl font-bold mb-6 text-white tracking-wide">
          TASK LIST
        </h3>

        <div className="flex flex-col gap-3">
          {paginatedTodos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No tasks found. Add one above!
            </div>
          ) : (
            paginatedTodos.map((todo) => (
              <TaskCard
                key={todo.id}
                todo={todo}
                isPending={isPending}
                isShowAll={isShowAll}
                handleToggle={handleToggle}
                setEditingTodo={setEditingTodo}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
      <Pagination
        total={tasks.length}
        current={pagination.current}
        pageSize={pagination.pageSize}
        onChange={(page) => setPagination({ ...pagination, current: page })}
      />
    </>
  );
};
