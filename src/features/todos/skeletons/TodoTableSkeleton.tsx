import Skeleton from "react-loading-skeleton";

export const TodoTableSkeleton = () => {
  return (
    <div className="flex flex-col min-h-66">
      <Skeleton
        height={58}
        count={4}
        highlightColor="#14b673"
        baseColor="#07111b"
      />
    </div>
  );
};
