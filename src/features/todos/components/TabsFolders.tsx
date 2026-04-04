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
        const result = await createFolder(trimmed);
        if (result.success) {
          onFolderCreated(result.data);
          onFolderChange(result.data.id);
        }
      } else {
        const result = await renameFolder(tabId, trimmed);
        if (result.success) onFolderRenamed(result.data);
      }
    });
  };

  const handleTabDelete = async (folderId: string) => {
    const result = await deleteFolder(folderId);
    if (result.success) onFolderDeleted(folderId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") {
      setEditingTabId(null);
      setNewName("");
    }
  };

  return (
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
          className="w-full bg-dark-grey border border-primary/20 rounded-lg p-2 text-white focus:outline-none focus:border-primary transition-colors"
        />
      }
    />
  );
};
