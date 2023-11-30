// Normalizes date into string formatted for NASA's API and for comparison
// Returns: YYYY-MM-DD
export const normalize = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}