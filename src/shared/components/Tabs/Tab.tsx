import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";

type Props = {
  name: string;
  title: string;
  active: boolean;
  isEditing: boolean;
  EditingInput: ReactNode;
  onClick: () => void;
  onDoubleClick?: () => void;
  isAdd?: boolean;
};

export const Tab = ({
  name,
  title,
  active,
  isEditing,
  EditingInput,
  onClick,
  onDoubleClick,
  isAdd = false,
}: Props) => {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      title={title}
      className={cn(
        "h-10 max-w-20 sm:max-w-30 xl:max-w-40 min-w-14 truncate px-1 sm:px-2 text-sm sm:text-base border-x border-t border-gray-600 rounded-t-lg transition-colors duration-150 cursor-pointer",
        isAdd &&
          `bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white ${isEditing ? "min-w-20 sm:min-w-30 xl:min-w-40" : "min-w-10"}`,
        !isAdd && "sm:min-w-30 xl:min-w-40",
        active && "bg-gray-800 text-white",
        !active && "bg-gray-900 text-gray-400 hover:text-gray-200",
      )}
    >
      {isEditing ? EditingInput : name}
    </button>
  );
};
