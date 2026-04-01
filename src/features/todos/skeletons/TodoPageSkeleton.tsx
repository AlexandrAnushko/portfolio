import { Bone } from "@/shared/components/skeletons/Bone";
import { TaskCard } from "./TaskCard";
import { TaskInput } from "./TaskInput";
import { Calendar } from "./Calendar";

export const TodoPageSkeleton = () => {
  return (
    <main className="h-full w-full mx-auto max-w-7xl px-8 pt-24 pb-20">
      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-white/10 pb-4">
        <Bone className="h-9 w-24 rounded-full" />
        <Bone className="h-9 w-28 rounded-full" />
        <Bone className="h-9 w-20 rounded-full" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left content */}
        <Calendar />

        {/* Right content */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-dark-bg p-6 shadow-xl">
          <TaskInput />

          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <TaskCard key={i} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2 border-t border-white/5 pt-6">
            <Bone className="h-8 w-8 rounded-lg" />
            <Bone className="h-8 w-8 rounded-lg" />
            <Bone className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
};
