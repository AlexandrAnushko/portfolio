"use server";

import prisma from "@/lib/db";
import { getUserId } from "@/lib/getUserId";

// Получить все задачи
export async function getTodos() {
  const userId = await getUserId();
  if (!userId) return [];
  return prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

// Добавить задачу
export async function addTodo(text: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");
  if (!text.trim()) return;
  await prisma.todo.create({ data: { text, userId } });
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

// Удалить задачу
export async function deleteTodo(id: string) {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await prisma.todo.delete({
    where: { id, userId },
  });
}
