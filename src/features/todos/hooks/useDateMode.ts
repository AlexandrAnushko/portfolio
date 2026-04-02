"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DateAndMode } from "../types/types";

export const useDateMode = () => {
  const [dateAndMode, setDateAndMode] = useState<DateAndMode>(() => ({
    selectedDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    isShowAll: false,
  }));
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);

  return {
    dateAndMode,
    setDateAndMode,
    showMobileCalendar,
    setShowMobileCalendar,
  };
};
