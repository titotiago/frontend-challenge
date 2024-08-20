export function getYearFromDate(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}
