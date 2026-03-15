import { renderHook } from "@testing-library/react";
import { useTodaySuccess } from "@/features/todos/hooks/useTodaySuccess";
import { toast } from "sonner";
import dayjs from "dayjs";

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const todayISO = dayjs().toISOString();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useTodaySuccess", () => {
  it("shows success toast when all today's todos are done", () => {
    const todos = [
      { id: "1", text: "A", done: true, date: todayISO, folderId: "f1" },
      { id: "2", text: "B", done: true, date: todayISO, folderId: "f1" },
    ];
    const dateAndMode = { selectedDate: todayISO, isShowAll: false };

    renderHook(() => useTodaySuccess({ todos, dateAndMode }));

    expect(toast.success).toHaveBeenCalledWith(
      "Well done! You completed all the tasks for today!",
    );
  });

  it("does not show toast when not all todos are done", () => {
    const todos = [
      { id: "1", text: "A", done: true, date: todayISO, folderId: "f1" },
      { id: "2", text: "B", done: false, date: todayISO, folderId: "f1" },
    ];
    const dateAndMode = { selectedDate: todayISO, isShowAll: false };

    renderHook(() => useTodaySuccess({ todos, dateAndMode }));

    expect(toast.success).not.toHaveBeenCalled();
  });

  it("does not show toast when list is empty", () => {
    const dateAndMode = { selectedDate: todayISO, isShowAll: false };

    renderHook(() => useTodaySuccess({ todos: [], dateAndMode }));

    expect(toast.success).not.toHaveBeenCalled();
  });

  it("does not show toast in showAll mode", () => {
    const todos = [
      { id: "1", text: "A", done: true, date: todayISO, folderId: "f1" },
    ];
    const dateAndMode = { selectedDate: todayISO, isShowAll: true };

    renderHook(() => useTodaySuccess({ todos, dateAndMode }));

    expect(toast.success).not.toHaveBeenCalled();
  });

  it("does not show toast for a different day", () => {
    const yesterday = dayjs().subtract(1, "day").toISOString();
    const todos = [
      { id: "1", text: "A", done: true, date: yesterday, folderId: "f1" },
    ];
    const dateAndMode = { selectedDate: yesterday, isShowAll: false };

    renderHook(() => useTodaySuccess({ todos, dateAndMode }));

    expect(toast.success).not.toHaveBeenCalled();
  });
});
