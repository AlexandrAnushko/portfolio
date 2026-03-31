"use client";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};

type Props = {
  messages: ContactMessage[];
};

export const MessageList = ({ messages }: Props) => {
  if (messages.length === 0) {
    return (
      <p className="text-neutral-400 text-center py-12">No messages yet.</p>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-asphalt p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-100">
              {msg.subject}
            </h3>
            <span className="text-sm text-neutral-500">
              {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 text-sm text-neutral-400">
            <span>{msg.name}</span>
            <span className="hidden sm:inline">·</span>
            <span>{msg.email}</span>
          </div>
          <p className="text-neutral-300 whitespace-pre-wrap">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};
