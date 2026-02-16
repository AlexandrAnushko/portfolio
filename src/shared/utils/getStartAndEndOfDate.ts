export const getStartAndEndOfDate = (d: string): { start: Date; end: Date } => {
  const start = new Date(d);
  const end = new Date(d);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};
