import { render, screen, fireEvent } from "@testing-library/react";
import { TaskInput } from "@/features/todos/components/TaskInput";

jest.mock("@/shared/components/Button", () => ({
  Button: ({ onClick, text, isDisabled }: any) => (
    <button onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  ),
}));

const defaultProps = {
  text: "",
  isPending: false,
  dateAndMode: { selectedDate: "2026-03-10T00:00:00.000Z", isShowAll: false },
  setText: jest.fn(),
  handleAdd: jest.fn(),
  handleShowDeleteModal: jest.fn(),
  setShowCalendar: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TaskInput", () => {
  it("renders textarea with placeholder", () => {
    render(<TaskInput {...defaultProps} />);
    expect(screen.getByPlaceholderText("Add task...")).toBeInTheDocument();
  });

  it("calls setText on input change", () => {
    render(<TaskInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Add task...");
    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(defaultProps.setText).toHaveBeenCalled();
  });

  it("calls handleAdd on Enter key (without Shift)", () => {
    render(<TaskInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Add task...");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(defaultProps.handleAdd).toHaveBeenCalled();
  });

  it("does not call handleAdd on Shift+Enter", () => {
    render(<TaskInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Add task...");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(defaultProps.handleAdd).not.toHaveBeenCalled();
  });

  it("calls handleAdd on Add button click", () => {
    render(<TaskInput {...defaultProps} />);
    fireEvent.click(screen.getByText("Add"));
    expect(defaultProps.handleAdd).toHaveBeenCalled();
  });

  it("calls handleShowDeleteModal on Delete All click", () => {
    render(<TaskInput {...defaultProps} />);
    fireEvent.click(screen.getByText("Delete All"));
    expect(defaultProps.handleShowDeleteModal).toHaveBeenCalledWith(true);
  });

  it("shows date in calendar button on mobile", () => {
    render(<TaskInput {...defaultProps} />);
    expect(screen.getByText("2026-03-10")).toBeInTheDocument();
  });

  it('shows "All tasks" when isShowAll mode', () => {
    render(
      <TaskInput
        {...defaultProps}
        dateAndMode={{
          selectedDate: "2026-03-10T00:00:00.000Z",
          isShowAll: true,
        }}
      />,
    );
    expect(screen.getByText("All tasks")).toBeInTheDocument();
  });

  it("disables Add button when isPending", () => {
    render(<TaskInput {...defaultProps} isPending={true} />);
    expect(screen.getByText("Add")).toBeDisabled();
  });
});
