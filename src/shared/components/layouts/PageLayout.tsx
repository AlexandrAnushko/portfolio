import { getUserId } from "@/app/actions/getUserId";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

type Props = {
  children: React.ReactNode;
  id: string;
  isProtected?: boolean;
};
export default async function PageLayout({
  children,
  id,
  isProtected = false,
}: Props) {
  if (isProtected) {
    const userId = await getUserId();
    if (!userId) redirect(ROUTES.ROOT);
  }
  return (
    <main
      id={id}
      className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 animate-in fade-in duration-500"
    >
      {children}
    </main>
  );
}
