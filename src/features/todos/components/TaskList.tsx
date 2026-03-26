import { Trash2, Edit3, Check } from "lucide-react";
import { formatDate } from "@/shared/utils/formatDate";
import { Todo } from "../types/types";

type Props = {
  tasks: Todo[];
  isShowAll: boolean;
  isPending: boolean;
  pagination: { current: number; pageSize: number };
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
  setEditingTodo: (item: Todo | null) => void;
};

export const TaskList = ({
  tasks,
  isShowAll,
  isPending,
  pagination,
  handleToggle,
  handleDelete,
  setEditingTodo,
}: Props) => {
  const { current, pageSize } = pagination;
  const paginatedTodos = tasks.slice(
    (current - 1) * pageSize,
    current * pageSize,
  );

  return (
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
            <div
              key={todo.id}
              className={`group flex items-center gap-4 bg-dark-bg-hover border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-200 ${
                todo.done ? "opacity-60" : ""
              }`}
            >
              <button
                onClick={() => handleToggle(todo.id)}
                disabled={isPending}
                className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                  todo.done
                    ? "bg-primary border-primary text-asphalt"
                    : "border-gray-500 hover:border-primary bg-transparent"
                }`}
              >
                {todo.done && <Check className="w-4 h-4" strokeWidth={3} />}
              </button>

              <span
                className={`flex-1 text-[15px] ${
                  todo.done
                    ? "text-gray-400 line-through decoration-gray-500"
                    : "text-gray-200"
                }`}
              >
                {todo.text}
              </span>

              <div className="flex flex-col self-start gap-1">
                {isShowAll && (
                  <span className="text-xs font-mono text-gray-500">
                    {formatDate(todo.date)}
                  </span>
                )}

                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingTodo(todo);
                    }}
                    disabled={isPending}
                    className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    disabled={isPending}
                    className="p-2 text-gray-400 hover:text-secondary rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
