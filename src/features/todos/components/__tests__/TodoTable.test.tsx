import { render, screen } from "@testing-library/react";
import { TodoTable } from "@/features/todos/components/TodoTable";
import type { Todo } from "@/features/todos/types/types";

// Mock antd components
jest.mock("antd", () => ({
  Checkbox: ({ checked, onChange, disabled }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      data-testid="todo-checkbox"
    />
  ),
  Table: ({ dataSource, columns, pagination: pag }: any) => (
    <div data-testid="todo-table">
      {dataSource.map((item: any, index: number) => (
        <div key={item.id} data-testid={`todo-row-${item.id}`}>
          {columns[0].render(item, item, index)}
        </div>
      ))}
      <div data-testid="pagination">
        page={pag.current} size={pag.pageSize}
      </div>
    </div>
  ),
}));

jest.mock("@/shared/components/antd/Button", () => ({
  Button: ({ onClick, icon, disabled }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid="action-btn">
      {icon}
    </button>
  ),
}));

jest.mock("lucide-react", () => ({
  Pencil: () => <span data-testid="pencil-icon">edit</span>,
  Trash2: () => <span data-testid="trash-icon">delete</span>,
}));

jest.mock("@/shared/hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));

jest.mock("@/shared/utils/formatDate", () => ({
  formatDate: (d: string) => `formatted-${d.slice(0, 10)}`,
}));

jest.mock("@/features/todos/skeletons/TodoTableSkeleton", () => ({
  TodoTableSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

jest.mock("@/shared/utils/cn", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

const sampleTodos: Todo[] = [
  { id: "t1", text: "Buy milk", done: false, date: "2026-03-10T00:00:00.000Z", folderId: "f1" },
  { id: "t2", text: "Walk dog", done: true, date: "2026-03-10T00:00:00.000Z", folderId: "f1" },
];

const defaultProps = {
  todos: sampleTodos,
  isShowAll: false,
  isPending: false,
  pagination: { current: 1, pageSize: 10 },
  onPaginationChange: jest.fn(),
  handleToggle: jest.fn(),
  handleDelete: jest.fn(),
  setEditingTodo: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TodoTable", () => {
  it("renders all todos", () => {
    render(<TodoTable {...defaultProps} />);
    expect(screen.getByText(/Buy milk/)).toBeInTheDocument();
    expect(screen.getByText(/Walk dog/)).toBeInTheDocument();
  });

  it("shows skeleton when pending and no todos", () => {
    render(<TodoTable {...defaultProps} todos={[]} isPending={true} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows table when pending but has todos", () => {
    render(<TodoTable {...defaultProps} isPending={true} />);
    expect(screen.getByTestId("todo-table")).toBeInTheDocument();
  });

  it("applies line-through styling on done todos", () => {
    render(<TodoTable {...defaultProps} />);
    // The second todo (Walk dog) is done
    const walkDogRow = screen.getByTestId("todo-row-t2");
    const textDiv = walkDogRow.querySelector(".line-through");
    expect(textDiv).toBeInTheDocument();
  });

  it("does not apply line-through on incomplete todos", () => {
    render(<TodoTable {...defaultProps} />);
    const buyMilkRow = screen.getByTestId("todo-row-t1");
    const textDiv = buyMilkRow.querySelector(".line-through");
    expect(textDiv).toBeNull();
  });

  it("renders numbered tasks based on pagination", () => {
    render(<TodoTable {...defaultProps} />);
    expect(screen.getByText(/1\) Buy milk/)).toBeInTheDocument();
    expect(screen.getByText(/2\) Walk dog/)).toBeInTheDocument();
  });

  it("correctly numbers tasks on page 2", () => {
    render(
      <TodoTable
        {...defaultProps}
        pagination={{ current: 2, pageSize: 10 }}
      />,
    );
    expect(screen.getByText(/11\) Buy milk/)).toBeInTheDocument();
  });

  it("renders edit and delete buttons for each todo", () => {
    render(<TodoTable {...defaultProps} />);
    const editIcons = screen.getAllByTestId("pencil-icon");
    const deleteIcons = screen.getAllByTestId("trash-icon");
    expect(editIcons).toHaveLength(2);
    expect(deleteIcons).toHaveLength(2);
  });
});
