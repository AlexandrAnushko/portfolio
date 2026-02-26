"use server";

import { TodoFolderDB } from "@/features/todos/types";
import prisma from "@/lib/db";
import { TODOS_TAGS } from "@/shared/constants/tags";
import { cacheTag, updateTag } from "next/cache";

export const getFolders = async (userId: string) => {
  "use cache";
  cacheTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

  const folders: TodoFolderDB[] = await prisma.todoFolder.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return folders.map((f) => ({
    ...f,
    createdAt: f.createdAt.toISOString(),
  }));
};

export const createFolder = async (userId: string, name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return null;

  const folder = await prisma.todoFolder.create({
    data: { name: trimmed, userId },
  });

  updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

  return { ...folder, createdAt: folder.createdAt.toISOString() };
};

export const renameFolder = async (
  userId: string,
  folderId: string,
  name: string,
) => {
  const trimmed = name.trim();
  if (!trimmed) return null;

  const folder = await prisma.todoFolder.update({
    where: { id: folderId, userId },
    data: { name: trimmed },
  });

  updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

  return { ...folder, createdAt: folder.createdAt.toISOString() };
};

export const deleteFolder = async (userId: string, folderId: string) => {
  // Prevent deleting the Main folder
  const folder = await prisma.todoFolder.findUnique({
    where: { id: folderId, userId },
  });
  if (!folder || folder.name === "Main") return;

  // Move all todos in this folder to the Main folder
  const mainFolder = await prisma.todoFolder.findFirst({
    where: { userId, name: "Main" },
  });

  if (mainFolder) {
    await prisma.todo.updateMany({
      where: { folderId, userId },
      data: { folderId: mainFolder.id },
    });
  }

  await prisma.todoFolder.delete({ where: { id: folderId, userId } });

  updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);
};
