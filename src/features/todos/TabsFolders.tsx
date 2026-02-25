"use client";

import { useRef, useState, useTransition } from "react";
import { Tabs } from "@/shared/components/Tabs/Tabs";
import { TodoFolder } from "./types";
import { createFolder } from "@/app/actions/folders";

type Props = {
  userId: string;
  folders: TodoFolder[];
  activeFolderId: string;
  onFolderChange: (id: string) => void;
  onFolderCreated: (folder: TodoFolder) => void;
};

export const TabsFolders = ({
  userId,
  folders,
  activeFolderId,
  onFolderChange,
  onFolderCreated,
}: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    setIsAdding(true);
    setNewName("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleConfirm = () => {
    const trimmed = newName.trim();
    setIsAdding(false);
    setNewName("");
    if (!trimmed) return;

    startTransition(async () => {
      const created = await createFolder(userId, trimmed);
      if (created) {
        onFolderCreated(created);
        onFolderChange(created.id);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewName("");
    }
  };

  return (
    <div className="flex w-full items-end justify-start px-4 pt-2 rounded-t-xl bg-gray-700 overflow-x-auto">
      <Tabs
        tabs={folders}
        activeId={activeFolderId}
        onTabClick={onFolderChange}
        onAddClick={handleAddClick}
      />
      {isAdding && (
        <input
          ref={inputRef}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleConfirm}
          onKeyDown={handleKeyDown}
          placeholder="Folder name…"
          maxLength={30}
          disabled={isPending}
          className="ml-2 mb-0.5 h-8 w-36 rounded-md border border-gray-500 bg-gray-800 px-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 disabled:opacity-50"
        />
      )}
    </div>
  );
};
