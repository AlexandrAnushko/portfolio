import { z } from "zod";

export const addTodoSchema = z.object({
  text: z.string().trim().min(1),
  date: z.string().min(1),
  folderId: z.string().min(1),
});

export const updateTodoSchema = z.object({
  id: z.string().min(1),
  text: z.string().trim().min(1),
  date: z.string().min(1),
  folderId: z.string().min(1),
});

export const todoActionSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  folderId: z.string().min(1),
});

export const deleteTodosSchema = z.object({
  folderId: z.string().min(1),
  date: z.string().optional(),
});

export const folderNameSchema = z.object({
  name: z.string().trim().min(1),
});

export const renameFolderSchema = z.object({
  folderId: z.string().min(1),
  name: z.string().trim().min(1),
});

export const folderIdSchema = z.object({
  folderId: z.string().min(1),
});
