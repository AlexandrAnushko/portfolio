import { getFolders, createFolder, renameFolder, deleteFolder } from "@/app/actions/folders";
import prisma from "@/lib/db";

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
    todoFolder: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    todo: {
      updateMany: jest.fn(),
    },
  },
}));

const mockPrisma = prisma as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getFolders", () => {
  it("returns folders with ISO date strings", async () => {
    const date = new Date("2026-01-01T00:00:00.000Z");
    mockPrisma.todoFolder.findMany.mockResolvedValue([
      { id: "f1", name: "Main", userId: "u1", createdAt: date },
    ]);

    const result = await getFolders("u1");

    expect(result).toEqual([
      { id: "f1", name: "Main", userId: "u1", createdAt: "2026-01-01T00:00:00.000Z" },
    ]);
  });
});

describe("createFolder", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(createFolder("Work")).rejects.toThrow("Unauthorized");
  });

  it("returns null for empty name", async () => {
    mockGetUserId.mockResolvedValue("u1");
    const result = await createFolder("   ");
    expect(result).toBeNull();
  });

  it("creates folder and returns it with ISO date", async () => {
    mockGetUserId.mockResolvedValue("u1");
    const date = new Date("2026-03-10T00:00:00.000Z");
    mockPrisma.todoFolder.create.mockResolvedValue({
      id: "f2",
      name: "Work",
      userId: "u1",
      createdAt: date,
    });

    const result = await createFolder("Work");

    expect(mockPrisma.todoFolder.create).toHaveBeenCalledWith({
      data: { name: "Work", userId: "u1" },
    });
    expect(result).toEqual({
      id: "f2",
      name: "Work",
      userId: "u1",
      createdAt: "2026-03-10T00:00:00.000Z",
    });
  });
});

describe("renameFolder", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(renameFolder("f1", "New Name")).rejects.toThrow("Unauthorized");
  });

  it("returns null for empty name", async () => {
    mockGetUserId.mockResolvedValue("u1");
    const result = await renameFolder("f1", "  ");
    expect(result).toBeNull();
  });

  it("renames folder and returns updated result", async () => {
    mockGetUserId.mockResolvedValue("u1");
    const date = new Date("2026-03-10T00:00:00.000Z");
    mockPrisma.todoFolder.update.mockResolvedValue({
      id: "f1",
      name: "Renamed",
      userId: "u1",
      createdAt: date,
    });

    const result = await renameFolder("f1", "Renamed");

    expect(mockPrisma.todoFolder.update).toHaveBeenCalledWith({
      where: { id: "f1", userId: "u1" },
      data: { name: "Renamed" },
    });
    expect(result!.name).toBe("Renamed");
  });
});

describe("deleteFolder", () => {
  it("throws if user is not authenticated", async () => {
    mockGetUserId.mockResolvedValue(null);
    await expect(deleteFolder("f1")).rejects.toThrow("Unauthorized");
  });

  it("does not delete Main folder", async () => {
    mockGetUserId.mockResolvedValue("u1");
    mockPrisma.todoFolder.findUnique.mockResolvedValue({
      id: "f1",
      name: "Main",
      userId: "u1",
    });

    await deleteFolder("f1");

    expect(mockPrisma.todoFolder.delete).not.toHaveBeenCalled();
  });

  it("moves todos to Main folder and deletes the folder", async () => {
    mockGetUserId.mockResolvedValue("u1");
    mockPrisma.todoFolder.findUnique.mockResolvedValue({
      id: "f2",
      name: "Work",
      userId: "u1",
    });
    mockPrisma.todoFolder.findFirst.mockResolvedValue({
      id: "f1",
      name: "Main",
      userId: "u1",
    });
    mockPrisma.todo.updateMany.mockResolvedValue({ count: 2 });
    mockPrisma.todoFolder.delete.mockResolvedValue({});

    await deleteFolder("f2");

    expect(mockPrisma.todo.updateMany).toHaveBeenCalledWith({
      where: { folderId: "f2", userId: "u1" },
      data: { folderId: "f1" },
    });
    expect(mockPrisma.todoFolder.delete).toHaveBeenCalledWith({
      where: { id: "f2", userId: "u1" },
    });
  });

  it("throws if Main folder not found", async () => {
    mockGetUserId.mockResolvedValue("u1");
    mockPrisma.todoFolder.findUnique.mockResolvedValue({
      id: "f2",
      name: "Work",
      userId: "u1",
    });
    mockPrisma.todoFolder.findFirst.mockResolvedValue(null);

    await expect(deleteFolder("f2")).rejects.toThrow("Main folder not found");
  });
});
