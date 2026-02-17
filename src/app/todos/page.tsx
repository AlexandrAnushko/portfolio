import TodoClient from "../../features/todos/TodoClient";

export default async function TodoPage() {
  return (
    <div className="flex justify-center">
      <TodoClient />
    </div>
  );
}
