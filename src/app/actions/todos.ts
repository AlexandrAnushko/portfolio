"use server";

import prisma from "@/lib/db";
import { getUserId } from "@/lib/getUserId";
import { getStartAndEndOfDate } from "@/shared/utils/getStartAndEndOfDate";

type DeleteWhere = {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
};

// Получить все задачи
export async function getAllTodos() {
  const userId = await getUserId();
  if (!userId) return [];

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return todos.map((t) => ({
    ...t,
    date: t.date.toISOString(),
  }));
}

// Получение задач по дате
export async function getTodosByDate(date: string) {
  const userId = await getUserId();
  if (!userId) return [];

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
}

// Добавить задачу
export async function addTodo(text: string, date: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");
  if (!text.trim()) return;
  await prisma.todo.create({ data: { text, date: new Date(date), userId } });
}

// Переключить done
export async function toggleTodo(id: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({
    where: { id, userId },
  });

  if (!todo) return;

  await prisma.todo.update({
    where: { id },
    data: { done: !todo.done },
  });
}

// Изменить текст
export async function updateTodo(id: string, text: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await prisma.todo.update({
    where: { id, userId },
    data: { text },
  });
}

export async function deleteTodoById(id: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await prisma.todo.delete({
    where: { id, userId },
  });
}

export async function deleteTodos(date?: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

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
}
