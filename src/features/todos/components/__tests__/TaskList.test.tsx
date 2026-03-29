import { render, screen, fireEvent } from "@testing-library/react";
import { TaskList } from "@/features/todos/components/tasks/TaskList";
import type { Todo } from "@/features/todos/types/types";

jest.mock("lucide-react", () => ({
  Trash2: () => <span data-testid="trash-icon">delete</span>,
  Edit3: () => <span data-testid="edit-icon">edit</span>,
  Check: () => <span data-testid="check-icon">check</span>,
  ChevronLeft: () => <span data-testid="chevron-left">left</span>,
  ChevronRight: () => <span data-testid="chevron-right">right</span>,
}));

jest.mock("@/shared/utils/formatDate", () => ({
  formatDate: (d: string) => `formatted-${d.slice(0, 10)}`,
}));

const sampleTodos: Todo[] = [
  {
    id: "t1",
    text: "Buy milk",
    done: false,
    date: "2026-03-10T00:00:00.000Z",
    folderId: "f1",
  },
  {
    id: "t2",
    text: "Walk dog",
    done: true,
    date: "2026-03-10T00:00:00.000Z",
    folderId: "f1",
  },
];

const defaultProps = {
  tasks: sampleTodos,
  isShowAll: false,
  isPending: false,
  pagination: { current: 1, pageSize: 10 },
  handleToggle: jest.fn(),
  handleDelete: jest.fn(),
  setEditingTodo: jest.fn(),
  setPagination: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TaskList", () => {
  it("renders all todos", () => {
    render(<TaskList {...defaultProps} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
  });

  it("shows empty message when no todos", () => {
    render(<TaskList {...defaultProps} tasks={[]} />);
    expect(
      screen.getByText("No tasks found. Add one above!"),
    ).toBeInTheDocument();
  });

  it("applies opacity class on done todos", () => {
    render(<TaskList {...defaultProps} />);
    const walkDogText = screen.getByText("Walk dog");
    expect(walkDogText.className).toContain("line-through");
  });

  it("does not apply line-through on incomplete todos", () => {
    render(<TaskList {...defaultProps} />);
    const buyMilkText = screen.getByText("Buy milk");
    expect(buyMilkText.className).not.toContain("line-through");
  });

  it("renders edit and delete buttons for each todo", () => {
    render(<TaskList {...defaultProps} />);
    expect(screen.getAllByTestId("edit-icon")).toHaveLength(2);
    expect(screen.getAllByTestId("trash-icon")).toHaveLength(2);
  });

  it("calls handleToggle when toggle button is clicked", () => {
    render(<TaskList {...defaultProps} />);
    const toggleButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          !btn.querySelector("[data-testid='edit-icon']") &&
          !btn.querySelector("[data-testid='trash-icon']"),
      );
    fireEvent.click(toggleButtons[0]);
    expect(defaultProps.handleToggle).toHaveBeenCalledWith("t1");
  });

  it("calls handleDelete when delete button is clicked", () => {
    render(<TaskList {...defaultProps} />);
    const deleteButtons = screen
      .getAllByTestId("trash-icon")
      .map((icon) => icon.closest("button")!);
    fireEvent.click(deleteButtons[0]);
    expect(defaultProps.handleDelete).toHaveBeenCalledWith("t1");
  });

  it("calls setEditingTodo when edit button is clicked", () => {
    render(<TaskList {...defaultProps} />);
    const editButtons = screen
      .getAllByTestId("edit-icon")
      .map((icon) => icon.closest("button")!);
    fireEvent.click(editButtons[0]);
    expect(defaultProps.setEditingTodo).toHaveBeenCalledWith(sampleTodos[0]);
  });

  it("shows check icon only for done todos", () => {
    render(<TaskList {...defaultProps} />);
    expect(screen.getAllByTestId("check-icon")).toHaveLength(1);
  });

  it("shows formatted date when isShowAll is true", () => {
    render(<TaskList {...defaultProps} isShowAll={true} />);
    expect(screen.getAllByText("formatted-2026-03-10")).toHaveLength(2);
  });

  it("does not show date when isShowAll is false", () => {
    render(<TaskList {...defaultProps} isShowAll={false} />);
    expect(screen.queryByText("formatted-2026-03-10")).not.toBeInTheDocument();
  });

  it("disables buttons when isPending", () => {
    render(<TaskList {...defaultProps} isPending={true} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("paginates tasks - shows only current page items", () => {
    const manyTodos: Todo[] = Array.from({ length: 15 }, (_, i) => ({
      id: `t${i}`,
      text: `Task ${i}`,
      done: false,
      date: "2026-03-10T00:00:00.000Z",
      folderId: "f1",
    }));

    render(
      <TaskList
        {...defaultProps}
        tasks={manyTodos}
        pagination={{ current: 1, pageSize: 10 }}
      />,
    );
    expect(screen.getByText("Task 0")).toBeInTheDocument();
    expect(screen.getByText("Task 9")).toBeInTheDocument();
    expect(screen.queryByText("Task 10")).not.toBeInTheDocument();
  });

  it("shows correct items on page 2", () => {
    const manyTodos: Todo[] = Array.from({ length: 15 }, (_, i) => ({
      id: `t${i}`,
      text: `Task ${i}`,
      done: false,
      date: "2026-03-10T00:00:00.000Z",
      folderId: "f1",
    }));

    render(
      <TaskList
        {...defaultProps}
        tasks={manyTodos}
        pagination={{ current: 2, pageSize: 10 }}
      />,
    );
    expect(screen.queryByText("Task 9")).not.toBeInTheDocument();
    expect(screen.getByText("Task 10")).toBeInTheDocument();
    expect(screen.getByText("Task 14")).toBeInTheDocument();
  });
});
