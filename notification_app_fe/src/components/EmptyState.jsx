import React from 'react';

export default function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <h2>No Notifications</h2>
      <p>{message || "There are no notifications to display at this time."}</p>
    </div>
  );
}
