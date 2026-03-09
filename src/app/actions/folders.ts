"use server";

import { TodoFolderDB } from "@/features/todos/types/types";
import prisma from "@/lib/db";
import { TODOS_TAGS } from "@/shared/constants/tags";
import { cacheTag, updateTag } from "next/cache";
import { getUserId } from "@/app/actions/getUserId";

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

export const createFolder = async (name: string) => {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const trimmed = name.trim();
  if (!trimmed) return null;

  const folder = await prisma.todoFolder.create({
    data: { name: trimmed, userId },
  });

  updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

  return { ...folder, createdAt: folder.createdAt.toISOString() };
};

export const renameFolder = async (
  folderId: string,
  name: string,
) => {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const trimmed = name.trim();
  if (!trimmed) return null;

  const folder = await prisma.todoFolder.update({
    where: { id: folderId, userId },
    data: { name: trimmed },
  });

  updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

  return { ...folder, createdAt: folder.createdAt.toISOString() };
};

export const deleteFolder = async (folderId: string) => {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  // Prevent deleting the Main folder
  const folder = await prisma.todoFolder.findUnique({
    where: { id: folderId, userId },
  });
  if (!folder || folder.name === "Main") return;

  // Move all todos in this folder to the Main folder
  const mainFolder = await prisma.todoFolder.findFirst({
    where: { userId, name: "Main" },
  });

  if (!mainFolder) throw new Error("Main folder not found");

  await prisma.todo.updateMany({
    where: { folderId, userId },
    data: { folderId: mainFolder.id },
  });

  await prisma.todoFolder.delete({ where: { id: folderId, userId } });

  updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);
};
