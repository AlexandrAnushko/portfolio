import { Check, Edit3, Trash2 } from "lucide-react";
import { Todo } from "../../types/types";
import { formatDate } from "@/shared/utils/formatDate";

type Props = {
  todo: Todo;
  isPending: boolean;
  isShowAll: boolean;
  handleToggle: (id: string) => void;
  setEditingTodo: (todo: Todo) => void;
  handleDelete: (id: string) => void;
};
export const TaskCard = ({
  todo,
  isPending,
  isShowAll,
  handleToggle,
  handleDelete,
  setEditingTodo,
}: Props) => {
  return (
    <div
      className={`group flex items-start gap-4 bg-dark-bg-hover border border-white/30 hover:border-white/10 rounded-xl p-4 transition-all duration-200 ${
        todo.done ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => handleToggle(todo.id)}
        disabled={isPending}
        className={`w-6 h-6 mt-0.5 rounded flex items-center justify-center shrink-0 border transition-colors ${
          todo.done
            ? "bg-primary border-primary text-asphalt"
            : "border-gray-500 hover:border-primary bg-transparent"
        }`}
      >
        {todo.done && <Check className="w-4 h-4" strokeWidth={3} />}
      </button>

      <div className="flex-1">
        <div className="float-right ml-3 mb-1 flex flex-col items-end gap-1">
          {isShowAll && (
            <span className="text-xs font-mono text-gray-500">
              {formatDate(todo.date)}
            </span>
          )}

          <div className="flex items-center gap-1">
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

        <span
          className={`text-[15px] wrap-anywhere ${
            todo.done
              ? "text-gray-400 line-through decoration-gray-500"
              : "text-gray-200"
          }`}
        >
          {todo.text}
        </span>
      </div>
    </div>
  );
};
