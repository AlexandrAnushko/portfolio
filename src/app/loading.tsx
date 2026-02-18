import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function AppLoading() {
  return (
    <SkeletonTheme baseColor="#07111b" highlightColor="#14b673">
      <Skeleton height={112} />
      <main className="flex flex-col items-center flex-1">
        <section className="flex items-center justify-center w-full max-w-[80%] gap-20">
          <Skeleton width={400} height={400} />
          <Skeleton width={500} height={500} />
        </section>
      </main>
    </SkeletonTheme>
  );
}
