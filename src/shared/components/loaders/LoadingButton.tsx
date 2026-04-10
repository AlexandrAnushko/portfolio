import { cn } from "@/shared/utils/cn";
import { Spinner } from "./Spinner";

export const LoadingButton = ({
  size = "large",
}: {
  size?: "small" | "large" | "xl";
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center py-2 px-4 xl:px-6 gap-2 rounded-xl
        bg-primary outline-2 -outline-offset-2 outline-primary bg-linear-to-r from-blue-300 to-blue-500 animate-pulse`,
        {
          "xl:py-3": size === "large",
          "xl:py-4": size === "xl",
          "xl:py-2": size === "small",
        },
      )}
    >
      <span className="text-nowrap text-sm xl:text-base font-semibold uppercase">
        Loading
      </span>
      <Spinner />
    </div>
  );
};
