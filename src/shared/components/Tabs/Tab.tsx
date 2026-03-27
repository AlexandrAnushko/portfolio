"use client";

import { cn } from "@/shared/utils/cn";
import { ReactNode, useRef, useState } from "react";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { Plus } from "lucide-react";

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
          `px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors cursor-pointer`,
          {
            "bg-primary/10 text-primary": active,
            "text-gray-400 hover:text-white hover:bg-white/5": !active,
            "p-2.5": isAdd,
            "p-0": isEditing,
          },
        )}
      >
        {isEditing ? EditingInput : isAdd ? <Plus className="w-5 h-5" /> : name}
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
