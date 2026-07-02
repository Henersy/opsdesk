export function getPriorityClass(priority) {
  return `badge priority-${priority.toLowerCase()}`
}

export function getStatusClass(status) {
  return `badge status-${status.toLowerCase().replace(' ', '-')}`
}