import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      return decoded.userId;
    } catch {
      // fall through to check NextAuth session
    }
  }

  const session = await getServerSession(authOptions);
  if (session?.userId) {
    return session.userId;
  }

  return null;
}
