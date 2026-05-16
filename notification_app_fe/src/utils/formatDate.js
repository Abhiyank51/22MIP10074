export function formatDate(timestamp) {
  if (!timestamp) return "Unknown Date";
  
  try {
    const date = new Date(timestamp);
    
    // Check for invalid date
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
    
  } catch (error) {
    return "Invalid Date";
  }
}
