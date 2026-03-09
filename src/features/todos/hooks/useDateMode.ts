"use client";

import { useState } from "react";
import { DateAndMode } from "../types/types";

export const useDateMode = () => {
  const [dateAndMode, setDateAndMode] = useState<DateAndMode>(() => ({
    selectedDate: new Date().toISOString(),
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
