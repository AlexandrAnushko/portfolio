"use server";

import prisma from "@/lib/db";
import { getStartAndEndOfDate } from "@/shared/utils/getStartAndEndOfDate";
import { TODOS_TAGS } from "@/shared/constants/tags";
import { cacheTag } from "next/cache";
import { ActionResult, withAuth } from "./actionUtils";
import {
  addTodoSchema,
  deleteTodosSchema,
  folderIdSchema,
  todoActionSchema,
  updateTodoSchema,
} from "@/features/todos/todoSchema";
import { updateTodosCacheTags } from "@/features/todos/utils/updateTodosCacheTags";

export const getAllTodos = async (userId: string, folderId: string) => {
  "use cache";
  cacheTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);

  const todos = await prisma.todo.findMany({
    where: { userId, folderId },
    orderBy: [{ date: "asc" }, { createdAt: "asc" }],
  });

  return todos.map((t) => ({
    ...t,
    date: t.date.toISOString(),
  }));
};

export const getTodosByDate = async (
  userId: string,
  date: string,
  folderId: string,
) => {
  "use cache";
  const dateOnly = date.slice(0, 10);
  cacheTag(`${TODOS_TAGS.BY_DATE}-${userId}-${dateOnly}-${folderId}`);

  const { start, end } = getStartAndEndOfDate(dateOnly);

  const todos = await prisma.todo.findMany({
    where: {
      userId,
      folderId,
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: [{ date: "asc" }, { createdAt: "asc" }],
  });

  return todos.map((t) => ({
    ...t,
    date: t.date.toISOString(),
  }));
};

export async function addTodo(
  text: string,
  date: string,
  folderId: string,
): Promise<
  ActionResult<{
    id: string;
    text: string;
    done: boolean;
    date: string;
    folderId: string;
  }>
> {
  const parsed = addTodoSchema.safeParse({ text, date, folderId });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    const todo = await prisma.todo.create({
      data: {
        text: parsed.data.text,
        date: new Date(parsed.data.date),
        userId,
        folderId: parsed.data.folderId,
      },
    });

    updateTodosCacheTags(userId, parsed.data.folderId, parsed.data.date);

    return { ...todo, date: todo.date.toISOString() };
  });
}

export async function toggleTodo(
  id: string,
  date: string,
  folderId: string,
): Promise<ActionResult> {
  const parsed = todoActionSchema.safeParse({ id, date, folderId });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    await prisma.$executeRaw`
      UPDATE "Todo" SET done = NOT done WHERE id = ${parsed.data.id} AND "userId" = ${userId}
    `;

    updateTodosCacheTags(userId, parsed.data.folderId, parsed.data.date);

    return undefined;
  });
}

export async function updateTodo(
  id: string,
  text: string,
  date: string,
  folderId: string,
): Promise<ActionResult> {
  const parsed = updateTodoSchema.safeParse({ id, text, date, folderId });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    await prisma.todo.update({
      where: { id: parsed.data.id, userId },
      data: { text: parsed.data.text, date: new Date(parsed.data.date) },
    });

    updateTodosCacheTags(userId, parsed.data.folderId, parsed.data.date);

    return undefined;
  });
}

export async function deleteTodoById(
  id: string,
  date: string,
  folderId: string,
): Promise<ActionResult> {
  const parsed = todoActionSchema.safeParse({ id, date, folderId });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    await prisma.todo.delete({
      where: { id: parsed.data.id, userId },
    });

    updateTodosCacheTags(userId, parsed.data.folderId, parsed.data.date);

    return undefined;
  });
}

export async function deleteTodos(
  folderId: string,
  date?: string,
): Promise<ActionResult> {
  const parsed = deleteTodosSchema.safeParse({ folderId, date });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    const where: {
      userId: string;
      folderId: string;
      date?: { gte: Date; lte: Date };
    } = { userId, folderId: parsed.data.folderId };

    if (parsed.data.date) {
      const dateOnly = parsed.data.date.slice(0, 10);
      const { start, end } = getStartAndEndOfDate(dateOnly);
      where.date = { gte: start, lte: end };
    }

    await prisma.todo.deleteMany({ where });

    updateTodosCacheTags(userId, parsed.data.folderId, parsed.data.date);

    return undefined;
  });
}

export async function deleteTodosByFolder(
  folderId: string,
): Promise<ActionResult> {
  const parsed = folderIdSchema.safeParse({ folderId });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  return withAuth(async (userId) => {
    await prisma.todo.deleteMany({
      where: { folderId: parsed.data.folderId, userId },
    });

    updateTodosCacheTags(userId, parsed.data.folderId);

    return undefined;
  });
}
