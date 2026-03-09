"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Tabs, ADD_TAB_ID } from "@/shared/components/Tabs/Tabs";
import { TodoFolder } from "../types/types";
import {
  createFolder,
  deleteFolder,
  renameFolder,
} from "@/app/actions/folders";

type Props = {
  folders: TodoFolder[];
  activeFolderId: string;
  onFolderChange: (id: string) => void;
  onFolderCreated: (folder: TodoFolder) => void;
  onFolderRenamed: (folder: TodoFolder) => void;
  onFolderDeleted: (folderId: string) => void;
};

export const TabsFolders = ({
  folders,
  activeFolderId,
  onFolderChange,
  onFolderCreated,
  onFolderRenamed,
  onFolderDeleted,
}: Props) => {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTabId) inputRef.current?.focus();
  }, [editingTabId]);

  const openInput = (tabId: string, initialName = "") => {
    setEditingTabId(tabId);
    setNewName(initialName);
  };

  const handleAddClick = () => openInput(ADD_TAB_ID);

  const handleTabDoubleClick = (id: string, currentName: string) => {
    openInput(id, currentName);
  };

  const handleConfirm = () => {
    const trimmed = newName.trim();
    const tabId = editingTabId;
    setEditingTabId(null);
    setNewName("");
    if (!trimmed || !tabId) return;

    startTransition(async () => {
      if (tabId === ADD_TAB_ID) {
        const created = await createFolder(trimmed);
        if (created) {
          onFolderCreated(created);
          onFolderChange(created.id);
        }
      } else {
        const renamed = await renameFolder(tabId, trimmed);
        if (renamed) onFolderRenamed(renamed);
      }
    });
  };

  const handleTabDelete = async (folderId: string) => {
    await deleteFolder(folderId);
    onFolderDeleted(folderId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") {
      setEditingTabId(null);
      setNewName("");
    }
  };

  return (
    <div className="flex w-full items-end justify-start px-4 pt-2 rounded-t-xl bg-gray-700 overflow-x-auto">
      <Tabs
        tabs={folders}
        activeId={activeFolderId}
        onTabClick={onFolderChange}
        onTabDoubleClick={handleTabDoubleClick}
        onTabDelete={handleTabDelete}
        onAddClick={handleAddClick}
        editingTabId={editingTabId}
        plusTabTitle="New folder"
        deleteTabText="Delete folder"
        EditingInput={
          <input
            ref={inputRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleConfirm}
            onKeyDown={handleKeyDown}
            placeholder="Folder name…"
            maxLength={30}
            disabled={isPending}
            className="h-8 max-w-17 sm:max-w-26 xl:max-w-35 rounded-md border border-gray-500 bg-gray-800 px-1 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 disabled:opacity-50"
          />
        }
      />
    </div>
  );
};
