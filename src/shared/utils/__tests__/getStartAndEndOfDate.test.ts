import { getStartAndEndOfDate } from "@/shared/utils/getStartAndEndOfDate";

describe("getStartAndEndOfDate", () => {
  it("returns start of day at 00:00:00.000", () => {
    const { start } = getStartAndEndOfDate("2026-03-10");
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    expect(start.getSeconds()).toBe(0);
    expect(start.getMilliseconds()).toBe(0);
  });

  it("returns end of day at 23:59:59.999", () => {
    const { end } = getStartAndEndOfDate("2026-03-10");
    expect(end.getHours()).toBe(23);
    expect(end.getMinutes()).toBe(59);
    expect(end.getSeconds()).toBe(59);
    expect(end.getMilliseconds()).toBe(999);
  });

  it("preserves the correct date", () => {
    const { start, end } = getStartAndEndOfDate("2026-01-15");
    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(0); // January
    expect(start.getDate()).toBe(15);
    expect(end.getDate()).toBe(15);
  });
});
