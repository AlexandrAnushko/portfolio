import { render, screen, fireEvent } from "@testing-library/react";
import { EditModal } from "@/features/todos/components/EditModal";

jest.mock("antd", () => ({
  Input: {
    TextArea: (props: any) => (
      <textarea
        data-testid="edit-textarea"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        rows={props.rows}
      />
    ),
  },
  Calendar: () => <div data-testid="antd-calendar" />,
}));

jest.mock("@/shared/components/antd/Modal", () => ({
  Modal: ({ children, open, onOk, onCancel, title }: any) =>
    open ? (
      <div data-testid="modal">
        {title && <div data-testid="modal-title">{title}</div>}
        {children}
        <button data-testid="modal-ok" onClick={onOk}>OK</button>
        <button data-testid="modal-cancel" onClick={onCancel}>Cancel</button>
      </div>
    ) : null,
}));

jest.mock("@/shared/components/Button", () => ({
  Button: ({ onClick, text }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

jest.mock("@/features/todos/components/Calendar", () => ({
  Calendar: ({ onSelect }: any) => (
    <div data-testid="calendar">
      <button onClick={() => onSelect({ toDate: () => new Date("2026-04-01") })}>
        pick-date
      </button>
    </div>
  ),
}));

const editingTodo = {
  id: "t1",
  text: "Original task",
  done: false,
  date: "2026-03-10T00:00:00.000Z",
  folderId: "f1",
};

const defaultProps = {
  editingTodo,
  handleSaveEdit: jest.fn(),
  setEditingTodo: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EditModal", () => {
  it("renders with current todo text", () => {
    render(<EditModal {...defaultProps} />);
    const textarea = screen.getByTestId("edit-textarea");
    expect(textarea).toHaveValue("Original task");
  });

  it("calls handleSaveEdit on OK button", () => {
    render(<EditModal {...defaultProps} />);
    const okButtons = screen.getAllByTestId("modal-ok");
    // First modal OK = save
    fireEvent.click(okButtons[0]);
    expect(defaultProps.handleSaveEdit).toHaveBeenCalledWith(
      "Original task",
      "2026-03-10T00:00:00.000Z",
    );
  });

  it("calls setEditingTodo(null) on cancel", () => {
    render(<EditModal {...defaultProps} />);
    const cancelButtons = screen.getAllByTestId("modal-cancel");
    fireEvent.click(cancelButtons[0]);
    expect(defaultProps.setEditingTodo).toHaveBeenCalledWith(null);
  });

  it("updates text on textarea change", () => {
    render(<EditModal {...defaultProps} />);
    const textarea = screen.getByTestId("edit-textarea");
    fireEvent.change(textarea, { target: { value: "Updated task" } });
    expect(textarea).toHaveValue("Updated task");
  });

  it("saves on Enter key (without Shift)", () => {
    render(<EditModal {...defaultProps} />);
    const textarea = screen.getByTestId("edit-textarea");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(defaultProps.handleSaveEdit).toHaveBeenCalled();
  });

  it("does not save on Shift+Enter", () => {
    render(<EditModal {...defaultProps} />);
    const textarea = screen.getByTestId("edit-textarea");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(defaultProps.handleSaveEdit).not.toHaveBeenCalled();
  });
});
