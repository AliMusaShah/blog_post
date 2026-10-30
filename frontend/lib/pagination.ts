export function pageWindow(page: number, limit: number, count: number, total: number) {
  const pageCount = Math.max(1, Math.ceil(total / Math.max(limit, 1)));
  if (total === 0 || count === 0) {
    return { start: 0, end: 0, pageCount };
  }
  const start = (page - 1) * limit + 1;
  return { start, end: start + count - 1, pageCount };
}
