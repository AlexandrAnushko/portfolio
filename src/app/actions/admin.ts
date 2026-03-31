"use server";

import prisma from "@/lib/db";
import { getUserId } from "./getUserId";

async function verifyAdmin() {
  const userId = await getUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") return null;
  return userId;
}

export async function getContactMessages() {
  const adminId = await verifyAdmin();
  if (!adminId) return { success: false as const, error: "Unauthorized" };

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return { success: true as const, messages };
}
