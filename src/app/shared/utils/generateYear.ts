export function generateYear(): number[] {
  return Array.from(Array(new Date().getFullYear() - 1919), (_, i) => (i + 1920));
}
