export const paginationData = (data, page, size) =>
  data.slice((Number(page) - 1) * Number(size), Number(page) * Number(size));
