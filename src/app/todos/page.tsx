import { getUserId } from "@/app/actions/getUserId";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import TodoClient from "../../features/todos/TodoClient";
import { getFolders } from "@/app/actions/folders";

export default async function TodoPage() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);

  const folders = await getFolders(userId);

  return <TodoClient userId={userId} initialFolders={folders} />;
}
