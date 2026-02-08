interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  text,
  onClick,
  bgColor = "bg-blue-500",
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`w-full py-2 px-1 rounded hover:opacity-90 transition-opacity ${bgColor} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
