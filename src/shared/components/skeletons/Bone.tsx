export const Bone = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-primary/30 ${className ?? ""}`}
  />
);
