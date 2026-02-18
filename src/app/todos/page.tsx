import { getUserId } from "@/app/actions/getUserId";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import TodoClient from "../../features/todos/TodoClient";

export default async function TodoPage() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);

  return (
    <div className="flex justify-center">
      <TodoClient />
    </div>
  );
}
