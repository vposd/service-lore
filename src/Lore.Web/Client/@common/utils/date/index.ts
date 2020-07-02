export const isEmptyDate = (date: Date | string) =>
  new Date(date).getFullYear() < 1970;

export const normalizeDate = (date: Date | string) =>
  isEmptyDate(date) ? null : new Date(date);
