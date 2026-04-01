import { Bone } from "@/shared/components/skeletons/Bone";

export const Calendar = () => {
  return (
    <div className="hidden w-80 shrink-0 flex-col gap-4 xl:flex">
      <div className="rounded-2xl border border-white/10 bg-dark-bg p-6">
        {/* Month header */}
        <div className="mb-4 flex items-center justify-between">
          <Bone className="h-5 w-5" />
          <Bone className="h-5 w-28" />
          <Bone className="h-5 w-5" />
        </div>
        {/* Day labels */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <Bone key={i} className="mx-auto h-4 w-6" />
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Bone key={i} className="mx-auto h-8 w-8 rounded-lg" />
          ))}
        </div>
      </div>
      <Bone className="h-10 w-full rounded-xl" />
    </div>
  );
};
