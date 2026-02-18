import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const TodoPageSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#07111b" highlightColor="#14b673">
      <div className="flex justify-center">
        <div className="flex gap-10 p-4">
          <div className="w-75">
            <div className="flex flex-col gap-y-2">
              <Skeleton height={321} />
              <Skeleton height={39} />
            </div>
          </div>

          <div className="flex flex-col max-w-200 min-w-200 gap-y-2">
            <Skeleton height={104} />
            <Skeleton height={265} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
