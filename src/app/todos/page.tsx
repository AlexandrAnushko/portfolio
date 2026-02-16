import { redirect } from "next/navigation";
import TodoClient from "../../features/todos/TodoClient";
import { getUserId } from "../actions/getUserId";
import { getTodosByDate } from "../actions/todos";
import { ROUTES } from "@/shared/constants/routes";

export default async function TodoPage() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);

  const today = new Date().toISOString().slice(0, 10);
  const initialTodos = await getTodosByDate(today);

  return (
    <div className="flex justify-center">
      <TodoClient initialTodos={initialTodos} initialDate={today} />
    </div>
  );
}
