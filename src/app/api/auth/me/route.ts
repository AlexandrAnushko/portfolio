import { NextResponse } from "next/server";
import { getUserId } from "@/app/actions/getUserId";

export async function GET() {
  const userId = await getUserId();
  return NextResponse.json({
    isAuth: !!userId,
    userId: userId ?? null,
  });
}
