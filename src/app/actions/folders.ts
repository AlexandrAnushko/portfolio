"use server";

import { TodoFolder, TodoFolderDB } from "@/features/todos/types/types";
import prisma from "@/lib/db";
import { TODOS_TAGS } from "@/shared/constants/tags";
import { cacheTag, updateTag } from "next/cache";
import { ActionResult, withAuth } from "./actionUtils";
import {
  folderIdSchema,
  folderNameSchema,
  renameFolderSchema,
} from "@/features/todos/todoSchema";

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

export const createFolder = async (
  name: string,
): Promise<ActionResult<TodoFolder>> => {
  const parsed = folderNameSchema.safeParse({ name });
  if (!parsed.success) return { success: false, error: "Invalid folder name" };

  return withAuth(async (userId) => {
    const folder = await prisma.todoFolder.create({
      data: { name: parsed.data.name, userId },
    });

    updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

    return { ...folder, createdAt: folder.createdAt.toISOString() };
  });
};

export const renameFolder = async (
  folderId: string,
  name: string,
): Promise<ActionResult<TodoFolder>> => {
  const parsed = renameFolderSchema.safeParse({ folderId, name });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    const folder = await prisma.todoFolder.update({
      where: { id: parsed.data.folderId, userId },
      data: { name: parsed.data.name },
    });

    updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

    return { ...folder, createdAt: folder.createdAt.toISOString() };
  });
};

export const deleteFolder = async (folderId: string): Promise<ActionResult> => {
  const parsed = folderIdSchema.safeParse({ folderId });
  if (!parsed.success) return { success: false, error: "Invalid folder id" };

  return withAuth(async (userId) => {
    const folder = await prisma.todoFolder.findUnique({
      where: { id: parsed.data.folderId, userId },
    });
    if (!folder || folder.name === "Main")
      throw new Error("Cannot delete this folder");

    const mainFolder = await prisma.todoFolder.findFirst({
      where: { userId, name: "Main" },
    });
    if (!mainFolder) throw new Error("Main folder not found");

    await prisma.todo.updateMany({
      where: { folderId: parsed.data.folderId, userId },
      data: { folderId: mainFolder.id },
    });

    await prisma.todoFolder.delete({
      where: { id: parsed.data.folderId, userId },
    });

    updateTag(`${TODOS_TAGS.FOLDERS}-${userId}`);

    return undefined;
  });
};
