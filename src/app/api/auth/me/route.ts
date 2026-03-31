import { NextResponse } from "next/server";
import { getUserId } from "@/app/actions/getUserId";
import prisma from "@/lib/db";

export async function GET() {
  const userId = await getUserId();

  let role = null;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    role = user?.role ?? null;
  }

  return NextResponse.json({
    isAuth: !!userId,
    userId: userId ?? null,
    role,
  });
}
