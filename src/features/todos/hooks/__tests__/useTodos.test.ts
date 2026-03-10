import { renderHook, act } from "@testing-library/react";
import { useTodos } from "@/features/todos/hooks/useTodos";
import * as todosActions from "@/app/actions/todos";

jest.mock("@/app/actions/todos", () => ({
  getAllTodos: jest.fn(),
  getTodosByDate: jest.fn(),
  addTodo: jest.fn(),
  toggleTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodoById: jest.fn(),
  deleteTodos: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { error: jest.fn(), success: jest.fn() },
}));

const mockGetAllTodos = todosActions.getAllTodos as jest.Mock;
const mockGetTodosByDate = todosActions.getTodosByDate as jest.Mock;
const mockAddTodo = todosActions.addTodo as jest.Mock;
const mockToggleTodo = todosActions.toggleTodo as jest.Mock;
const mockUpdateTodo = todosActions.updateTodo as jest.Mock;
const mockDeleteTodoById = todosActions.deleteTodoById as jest.Mock;
const mockDeleteTodos = todosActions.deleteTodos as jest.Mock;

const baseParams = {
  userId: "user1",
  activeFolderId: "folder1",
  dateAndMode: {
    selectedDate: "2026-03-10T00:00:00.000Z",
    isShowAll: false,
  },
};

beforeEach(() => {
  jest.clearAllMocks();
  mockGetTodosByDate.mockResolvedValue([]);
  mockGetAllTodos.mockResolvedValue([]);
});

describe("useTodos", () => {
  it("fetches todos by date on mount", async () => {
    const todos = [
      { id: "t1", text: "Task 1", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "folder1" },
    ];
    mockGetTodosByDate.mockResolvedValue(todos);

    const { result } = renderHook(() => useTodos(baseParams));

    // Wait for effect
    await act(async () => {});

    expect(mockGetTodosByDate).toHaveBeenCalledWith("user1", "2026-03-10T00:00:00.000Z", "folder1");
    expect(result.current.todos).toEqual(todos);
  });

  it("fetches all todos when isShowAll is true", async () => {
    const params = {
      ...baseParams,
      dateAndMode: { selectedDate: "2026-03-10T00:00:00.000Z", isShowAll: true },
    };
    mockGetAllTodos.mockResolvedValue([]);

    const { result } = renderHook(() => useTodos(params));

    await act(async () => {});

    expect(mockGetAllTodos).toHaveBeenCalledWith("user1", "folder1");
    expect(result.current.todos).toEqual([]);
  });

  it("handleAdd skips empty text", async () => {
    const { result } = renderHook(() => useTodos(baseParams));
    await act(async () => {});

    act(() => {
      result.current.handleAdd("   ");
    });

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it("handleAdd optimistically adds a todo", async () => {
    mockAddTodo.mockResolvedValue({
      id: "server-id",
      text: "New task",
      done: false,
      date: "2026-03-10T00:00:00.000Z",
      folderId: "folder1",
    });

    const { result } = renderHook(() => useTodos(baseParams));
    await act(async () => {});

    act(() => {
      result.current.handleAdd("New task");
    });

    // Optimistic todo is added immediately
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("New task");

    // After server responds, the optimistic ID is replaced
    await act(async () => {});
    expect(result.current.todos[0].id).toBe("server-id");
  });

  it("handleToggle optimistically toggles done state", async () => {
    const todos = [
      { id: "t1", text: "Task", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "folder1" },
    ];
    mockGetTodosByDate.mockResolvedValue(todos);
    mockToggleTodo.mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos(baseParams));
    await act(async () => {});

    act(() => {
      result.current.handleToggle("t1");
    });

    expect(result.current.todos[0].done).toBe(true);
  });

  it("handleDelete optimistically removes a todo", async () => {
    const todos = [
      { id: "t1", text: "Task", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "folder1" },
      { id: "t2", text: "Task 2", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "folder1" },
    ];
    mockGetTodosByDate.mockResolvedValue(todos);
    mockDeleteTodoById.mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos(baseParams));
    await act(async () => {});

    act(() => {
      result.current.handleDelete("t1");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe("t2");
  });

  it("handleSaveEdit updates text and date optimistically", async () => {
    const todos = [
      { id: "t1", text: "Old", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "folder1" },
    ];
    mockGetTodosByDate.mockResolvedValue(todos);
    mockUpdateTodo.mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos(baseParams));
    await act(async () => {});

    act(() => {
      result.current.setEditingTodo(todos[0]);
    });

    act(() => {
      result.current.handleSaveEdit("Updated", "2026-03-10T00:00:00.000Z");
    });

    expect(result.current.todos[0].text).toBe("Updated");
    expect(result.current.editingTodo).toBeNull();
  });

  it("deleteAllTodos clears the list optimistically", async () => {
    const todos = [
      { id: "t1", text: "Task", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "folder1" },
    ];
    mockGetTodosByDate.mockResolvedValue(todos);
    mockDeleteTodos.mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos(baseParams));
    await act(async () => {});

    await act(async () => {
      result.current.deleteAllTodos();
    });

    expect(result.current.todos).toEqual([]);
  });

  it("does not fetch when userId is empty", async () => {
    const params = { ...baseParams, userId: "" };

    renderHook(() => useTodos(params));
    await act(async () => {});

    expect(mockGetTodosByDate).not.toHaveBeenCalled();
    expect(mockGetAllTodos).not.toHaveBeenCalled();
  });

  it("does not fetch when activeFolderId is empty", async () => {
    const params = { ...baseParams, activeFolderId: "" };

    renderHook(() => useTodos(params));
    await act(async () => {});

    expect(mockGetTodosByDate).not.toHaveBeenCalled();
    expect(mockGetAllTodos).not.toHaveBeenCalled();
  });

  it("resets pagination to page 1 on dateAndMode change", async () => {
    const { result, rerender } = renderHook(
      (props) => useTodos(props),
      { initialProps: baseParams },
    );
    await act(async () => {});

    act(() => {
      result.current.setPagination({ current: 3, pageSize: 10 });
    });

    const newParams = {
      ...baseParams,
      dateAndMode: { selectedDate: "2026-03-11T00:00:00.000Z", isShowAll: false },
    };
    rerender(newParams);
    await act(async () => {});

    expect(result.current.pagination.current).toBe(1);
  });
});
