import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ total, current, pageSize, onChange }: Props) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/5">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
            page === current
              ? "bg-primary text-asphalt"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
