import { redirect } from "next/navigation";
import { getUserId } from "../actions/getUserId";
import { ROUTES } from "@/shared/constants/routes";

export default async function Skills() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);
  return (
    <div className="flex items-center justify-center flex-1">
      <h1 className="text-5xl">Skills</h1>
    </div>
  );
}
