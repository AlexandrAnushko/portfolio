"use client";

import { cn } from "@/shared/utils/cn";
import { ReactNode, useRef, useState } from "react";
import { DeleteModal } from "@/shared/components/DeleteModal";

const LONG_PRESS_DURATION = 500;

type Props = {
  name: string;
  title: string;
  active: boolean;
  isEditing: boolean;
  EditingInput: ReactNode;
  onClick: () => void;
  onDoubleClick?: () => void;
  onDelete?: () => Promise<void>;
  isAdd?: boolean;
  deleteTabText?: string;
};

export const Tab = ({
  name,
  title,
  active,
  isEditing,
  EditingInput,
  onClick,
  onDoubleClick,
  onDelete,
  isAdd = false,
  deleteTabText = "Delete Tab",
}: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const startPress = () => {
    if (!onDelete) return;
    didLongPress.current = false;
    timerRef.current = setTimeout(() => {
      didLongPress.current = true;
      setDeleteOpen(true);
    }, LONG_PRESS_DURATION);
  };

  const cancelPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = () => {
    if (didLongPress.current) {
      didLongPress.current = false;
      return;
    }
    onClick();
  };

  return (
    <>
      <button
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
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
      {onDelete && deleteOpen && (
        <DeleteModal
          text={`${deleteTabText} "${name}"?`}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          action={onDelete}
        />
      )}
    </>
  );
};
