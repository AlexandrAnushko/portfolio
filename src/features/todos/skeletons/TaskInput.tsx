import { Bone } from "@/shared/components/skeletons/Bone";

export const TaskInput = () => {
  return (
    <>
      <Bone className="mb-4 h-20 w-full rounded-xl" />
      <div className="mb-6 flex items-center justify-between">
        <Bone className="h-6 w-24" />
        <div className="flex gap-2">
          <Bone className="h-9 w-16 rounded-lg" />
          <Bone className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </>
  );
};
