import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  onSelect: (date: Date) => void;
  value: Date;
};

export const Calendar = ({ onSelect, value }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startDay = currentMonth.getDay();
  const prefixBlanks = Array.from({ length: startDay === 0 ? 6 : startDay - 1 });

  return (
    <div className="bg-dark-bg-hover rounded-xl p-4 border border-white/5">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <div className="font-semibold text-white">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-gray-500 font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {prefixBlanks.map((_, i) => (
          <div key={`blank-${i}`} className="w-8 h-8" />
        ))}
        {days.map((day) => {
          const isSelected = isSameDay(day, value);
          const isCurrent = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelect(day)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-colors
                ${
                  isSelected
                    ? "bg-primary text-asphalt font-bold"
                    : isCurrent
                      ? "bg-white/10 text-white font-bold"
                      : "text-gray-300 hover:bg-white/5"
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};
