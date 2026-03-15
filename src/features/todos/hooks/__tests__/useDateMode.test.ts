import { renderHook, act } from "@testing-library/react";
import { useDateMode } from "@/features/todos/hooks/useDateMode";

describe("useDateMode", () => {
  it("initializes with today's date and isShowAll=false", () => {
    const { result } = renderHook(() => useDateMode());

    expect(result.current.dateAndMode.isShowAll).toBe(false);
    // selectedDate should be a valid ISO string from today
    expect(new Date(result.current.dateAndMode.selectedDate).getDate()).toBe(new Date().getDate());
  });

  it("initializes showMobileCalendar as false", () => {
    const { result } = renderHook(() => useDateMode());
    expect(result.current.showMobileCalendar).toBe(false);
  });

  it("updates dateAndMode via setDateAndMode", () => {
    const { result } = renderHook(() => useDateMode());

    act(() => {
      result.current.setDateAndMode({
        selectedDate: "2026-05-01T00:00:00.000Z",
        isShowAll: true,
      });
    });

    expect(result.current.dateAndMode.selectedDate).toBe("2026-05-01T00:00:00.000Z");
    expect(result.current.dateAndMode.isShowAll).toBe(true);
  });

  it("toggles showMobileCalendar", () => {
    const { result } = renderHook(() => useDateMode());

    act(() => {
      result.current.setShowMobileCalendar(true);
    });
    expect(result.current.showMobileCalendar).toBe(true);

    act(() => {
      result.current.setShowMobileCalendar(false);
    });
    expect(result.current.showMobileCalendar).toBe(false);
  });
});
