import { formatDate } from "@/shared/utils/formatDate";

describe("formatDate", () => {
  it("formats ISO string to DD.MM.YYYY", () => {
    expect(formatDate("2026-03-10T12:00:00.000Z")).toBe("10.03.2026");
  });

  it("pads single-digit day and month", () => {
    expect(formatDate("2026-01-05T00:00:00.000Z")).toBe("05.01.2026");
  });

  it("handles date-only string", () => {
    const result = formatDate("2026-12-25");
    expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
  });
});
