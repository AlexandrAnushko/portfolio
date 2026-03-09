"use server";

import prisma from "@/lib/db";
import { getStartAndEndOfDate } from "@/shared/utils/getStartAndEndOfDate";
import { TODOS_TAGS } from "@/shared/constants/tags";
import { cacheTag, updateTag } from "next/cache";

type TodoData = {
  text: string;
  date?: Date;
};

type DeleteWhere = {
  userId: string;
  folderId?: string;
  date?: {
    gte: Date;
    lte: Date;
  };
};

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
  userId: string,
  text: string,
  date: string,
  folderId: string,
) {
  if (!text.trim()) return;
  await prisma.todo.create({
    data: { text, date: new Date(date), userId, folderId },
  });

  updateTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);
  updateTag(`${TODOS_TAGS.BY_DATE}-${userId}-${date.slice(0, 10)}-${folderId}`);
}

// Toggle Todo done field
export async function toggleTodo(
  userId: string,
  id: string,
  date: string,
  folderId: string,
) {
  await prisma.$executeRaw`
  UPDATE "Todo" SET done = NOT done WHERE id = ${id} AND "userId" = ${userId}
`;

  updateTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);
  updateTag(`${TODOS_TAGS.BY_DATE}-${userId}-${date.slice(0, 10)}-${folderId}`);
}

// change text and date
export async function updateTodo(
  userId: string,
  id: string,
  text: string,
  date: string,
  folderId: string,
) {
  const data: TodoData = { text, date: new Date(date) };

  await prisma.todo.update({
    where: { id, userId },
    data,
  });

  updateTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);
  updateTag(`${TODOS_TAGS.BY_DATE}-${userId}-${date.slice(0, 10)}-${folderId}`);
}

export async function deleteTodoById(
  userId: string,
  id: string,
  date: string,
  folderId: string,
) {
  await prisma.todo.delete({
    where: { id, userId },
  });

  updateTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);
  updateTag(`${TODOS_TAGS.BY_DATE}-${userId}-${date.slice(0, 10)}-${folderId}`);
}

export async function deleteTodos(
  userId: string,
  folderId: string,
  date?: string,
) {
  const where: DeleteWhere = {
    userId,
    folderId,
  };

  if (date) {
    const dateOnly = date.slice(0, 10);
    const { start, end } = getStartAndEndOfDate(dateOnly);
    where.date = {
      gte: start,
      lte: end,
    };
  }

  await prisma.todo.deleteMany({ where });

  updateTag(`${TODOS_TAGS.ALL}-${userId}-${folderId}`);
  if (date) {
    updateTag(
      `${TODOS_TAGS.BY_DATE}-${userId}-${date.slice(0, 10)}-${folderId}`,
    );
  }
}
