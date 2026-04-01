import { Bone } from "@/shared/components/skeletons/Bone";

export const TaskCard = () => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-dark-bg-hover p-4">
      <Bone className="h-5 w-5 shrink-0 rounded-md" />
      <Bone className="h-4 flex-1" />
      <div className="flex gap-2">
        <Bone className="h-5 w-5 rounded" />
        <Bone className="h-5 w-5 rounded" />
      </div>
    </div>
  );
};
