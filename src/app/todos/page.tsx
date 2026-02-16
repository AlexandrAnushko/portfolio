import TodoClient from "../../features/todos/TodoClient";
import { getTodosByDate } from "../actions/todos";

export default async function TodoPage() {
  const today = new Date().toISOString().slice(0, 10);
  const initialTodos = await getTodosByDate(today);
  return (
    <div className="flex justify-center">
      <TodoClient initialTodos={initialTodos} initialDate={today} />
    </div>
  );
}
