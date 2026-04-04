import { getUserId } from "./getUserId";

export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function withAuth<T = undefined>(
  fn: (userId: string) => Promise<T>,
): Promise<ActionResult<T>> {
  const userId = await getUserId();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const data = await fn(userId);
    return { success: true, data };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
}
