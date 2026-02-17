"use server";

import prisma from "@/lib/db";
import { getStartAndEndOfDate } from "@/shared/utils/getStartAndEndOfDate";
import { TODOS_TAGS } from "@/shared/constants/tags";
import { cacheTag, revalidateTag } from "next/cache";
import { DateAndMode } from "@/features/todos/types";

type TodoData = {
  text: string;
  date?: Date;
};

type DeleteWhere = {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
};

// Получить все задачи
export const getAllTodos = async (userId: string) => {
  "use cache";
  cacheTag(TODOS_TAGS.ALL);

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return todos.map((t) => ({
    ...t,
    date: t.date.toISOString(),
  }));
};

// Получение задач по дате
export const getTodosByDate = async (userId: string, date: string) => {
  "use cache";
  cacheTag(TODOS_TAGS.BY_DATE);

  const { start, end } = getStartAndEndOfDate(date);

  const todos = await prisma.todo.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Приводим дату к строке
  return todos.map((t) => ({
    ...t,
    date: t.date.toISOString(),
  }));
};

// Добавить задачу
export async function addTodo(
  userId: string,
  text: string,
  dateAndMode: DateAndMode,
) {
  if (!text.trim()) return;
  await prisma.todo.create({
    data: { text, date: new Date(dateAndMode.selectedDate), userId },
  });
  revalidateTag(
    dateAndMode.isShowAll ? TODOS_TAGS.ALL : TODOS_TAGS.BY_DATE,
    "max",
  );
}

// Переключить done
export async function toggleTodo(
  userId: string,
  id: string,
  isShowAll: boolean,
) {
  const todo = await prisma.todo.findUnique({
    where: { id, userId },
  });

  if (!todo) return;

  await prisma.todo.update({
    where: { id },
    data: { done: !todo.done },
  });
  revalidateTag(isShowAll ? TODOS_TAGS.ALL : TODOS_TAGS.BY_DATE, "max");
}

// Изменить текст
export async function updateTodo(
  userId: string,
  id: string,
  text: string,
  isShowAll: boolean,
  date?: string,
) {
  const data: TodoData = { text };

  if (date) {
    data.date = new Date(date);
  }

  await prisma.todo.update({
    where: { id, userId },
    data,
  });
  revalidateTag(isShowAll ? TODOS_TAGS.ALL : TODOS_TAGS.BY_DATE, "max");
}

export async function deleteTodoById(
  userId: string,
  id: string,
  isShowAll: boolean,
) {
  await prisma.todo.delete({
    where: { id, userId },
  });

  revalidateTag(isShowAll ? TODOS_TAGS.ALL : TODOS_TAGS.BY_DATE, "max");
}

export async function deleteTodos(userId: string, date?: string) {
  const where: DeleteWhere = {
    userId,
  };

  if (date) {
    // delete all tasks for the specified day
    const { start, end } = getStartAndEndOfDate(date);
    where.date = {
      gte: start,
      lte: end,
    };
  }

  await prisma.todo.deleteMany({
    where,
  });
  revalidateTag(date ? TODOS_TAGS.BY_DATE : TODOS_TAGS.ALL, "max");
}
