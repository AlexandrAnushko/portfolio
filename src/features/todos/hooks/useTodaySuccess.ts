"use client";

import { useEffect, useRef } from "react";
import { DateAndMode, Todo } from "../types/types";
import { isSameDay } from "date-fns";
import { toast } from "sonner";

type UseTodaySuccessParams = {
  todos: Todo[];
  dateAndMode: DateAndMode;
};

// Checks if you have completed all of today's tasks.
export const useTodaySuccess = ({
  todos,
  dateAndMode,
}: UseTodaySuccessParams) => {
  const isTodaySuccess = useRef(false);

  useEffect(() => {
    if (
      !dateAndMode.isShowAll &&
      !!todos.length &&
      isSameDay(new Date(), new Date(dateAndMode.selectedDate)) &&
      !isTodaySuccess.current
    ) {
      if (todos.every((t) => t.done)) {
        isTodaySuccess.current = true;
        toast.success("Well done! You completed all the tasks for today!");
      }
    } else if (isTodaySuccess.current) {
      if (!todos.every((t) => t.done)) {
        isTodaySuccess.current = false;
      }
    }
  }, [todos, dateAndMode]);
};
