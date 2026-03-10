import { addTodo, toggleTodo, updateTodo, deleteTodoById, deleteTodos } from "@/app/actions/todos";
import prisma from "@/lib/db";

// --- Mocks ---

jest.mock("next/cache", () => ({
  cacheTag: jest.fn(),
  updateTag: jest.fn(),
}));

const mockGetUserId = jest.fn();
jest.mock("@/app/actions/getUserId", () => ({
  getUserId: () => mockGetUserId(),
}));

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    todo: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    $executeRaw: jest.fn(),
  },
}));

const mockPrisma = prisma as any;

// --- Tests ---

beforeEach(() => {
  jest.clearAllMocks();
});

describe("addTodo", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(addTodo("test", "2026-03-10T00:00:00.000Z", "folder1")).rejects.toThrow("Unauthorized");
  });

  it("returns null for empty text", async () => {
    mockGetUserId.mockResolvedValue("user1");
    const result = await addTodo("   ", "2026-03-10T00:00:00.000Z", "folder1");
    expect(result).toBeNull();
    expect(mockPrisma.todo.create).not.toHaveBeenCalled();
  });

  it("creates a todo and returns it with ISO date", async () => {
    mockGetUserId.mockResolvedValue("user1");
    const date = new Date("2026-03-10T00:00:00.000Z");
    mockPrisma.todo.create.mockResolvedValue({
      id: "t1",
      text: "Buy milk",
      done: false,
      date,
      userId: "user1",
      folderId: "folder1",
    });

    const result = await addTodo("Buy milk", "2026-03-10T00:00:00.000Z", "folder1");

    expect(mockPrisma.todo.create).toHaveBeenCalledWith({
      data: {
        text: "Buy milk",
        date,
        userId: "user1",
        folderId: "folder1",
      },
    });
    expect(result).toEqual({
      id: "t1",
      text: "Buy milk",
      done: false,
      date: "2026-03-10T00:00:00.000Z",
      userId: "user1",
      folderId: "folder1",
    });
  });
});

describe("toggleTodo", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(toggleTodo("t1", "2026-03-10", "folder1")).rejects.toThrow("Unauthorized");
  });

  it("executes raw SQL toggle", async () => {
    mockGetUserId.mockResolvedValue("user1");
    mockPrisma.$executeRaw.mockResolvedValue(1);

    await toggleTodo("t1", "2026-03-10", "folder1");

    expect(mockPrisma.$executeRaw).toHaveBeenCalled();
  });
});

describe("updateTodo", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(updateTodo("t1", "new text", "2026-03-10", "folder1")).rejects.toThrow("Unauthorized");
  });

  it("updates text and date", async () => {
    mockGetUserId.mockResolvedValue("user1");
    mockPrisma.todo.update.mockResolvedValue({});

    await updateTodo("t1", "updated", "2026-03-11T00:00:00.000Z", "folder1");

    expect(mockPrisma.todo.update).toHaveBeenCalledWith({
      where: { id: "t1", userId: "user1" },
      data: { text: "updated", date: new Date("2026-03-11T00:00:00.000Z") },
    });
  });
});

describe("deleteTodoById", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(deleteTodoById("t1", "2026-03-10", "folder1")).rejects.toThrow("Unauthorized");
  });

  it("deletes the todo by id and userId", async () => {
    mockGetUserId.mockResolvedValue("user1");
    mockPrisma.todo.delete.mockResolvedValue({});

    await deleteTodoById("t1", "2026-03-10T00:00:00.000Z", "folder1");

    expect(mockPrisma.todo.delete).toHaveBeenCalledWith({
      where: { id: "t1", userId: "user1" },
    });
  });
});

describe("deleteTodos", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(deleteTodos("folder1")).rejects.toThrow("Unauthorized");
  });

  it("deletes all todos in folder when no date given", async () => {
    mockGetUserId.mockResolvedValue("user1");
    mockPrisma.todo.deleteMany.mockResolvedValue({ count: 3 });

    await deleteTodos("folder1");

    expect(mockPrisma.todo.deleteMany).toHaveBeenCalledWith({
      where: { userId: "user1", folderId: "folder1" },
    });
  });

  it("deletes todos filtered by date range when date given", async () => {
    mockGetUserId.mockResolvedValue("user1");
    mockPrisma.todo.deleteMany.mockResolvedValue({ count: 2 });

    await deleteTodos("folder1", "2026-03-10T12:00:00.000Z");

    const call = mockPrisma.todo.deleteMany.mock.calls[0][0];
    expect(call.where.userId).toBe("user1");
    expect(call.where.folderId).toBe("folder1");
    expect(call.where.date.gte).toBeInstanceOf(Date);
    expect(call.where.date.lte).toBeInstanceOf(Date);
  });
});
