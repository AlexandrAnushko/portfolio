import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
  className?: string;
  label?: string;
  errorMessage?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      rows = 5,
      className = "",
      placeholder = "Add text...",
      label,
      errorMessage,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="relative">
        {label && (
          <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
            {label}
          </label>
        )}
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
        {errorMessage && (
          <p className="absolute -bottom-[1.5em] right-0 text-red-400 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
