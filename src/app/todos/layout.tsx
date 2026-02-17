import { getUserId } from "@/app/actions/getUserId";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Suspense } from "react";

export default async function TodosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);

  return <Suspense fallback="...Loading todos">{children}</Suspense>;
}
