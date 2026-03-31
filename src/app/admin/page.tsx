import { getUserId } from "@/app/actions/getUserId";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import prisma from "@/lib/db";
import { MessageList } from "@/features/admin/MessageList";

export default async function AdminPage() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") redirect(ROUTES.ROOT);

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-100 mb-3">
          Admin Panel
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
          Manage and review contact messages from users.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-asphalt p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl font-bold mb-1">
            {messages.length}
          </div>
          <p className="text-gray-400 text-sm">Total Messages</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-6">
          Contact Messages
        </h2>
        <MessageList messages={messages} />
      </section>
    </main>
  );
}
