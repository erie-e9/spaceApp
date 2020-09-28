export default function truncateString(string, limit) {
  if (string.length <= limit) {
    return string
  }

  return `${string.slice(0, limit)}...`
}
