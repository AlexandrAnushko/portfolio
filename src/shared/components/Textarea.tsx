import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
  className?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ rows = 5, className = "", placeholder = "Add text...", ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          `custom-scrollbar w-full bg-dark-grey border border-primary/30 rounded-lg px-4 py-3 text-white 
            focus:outline-none focus:border-primary focus:ring-primary/50 transition-colors resize-none ${className}`,
        )}
        {...rest}
      />
    );
  },
);

Textarea.displayName = "Textarea";
