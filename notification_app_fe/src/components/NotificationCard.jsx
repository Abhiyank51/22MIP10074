import React, { useEffect } from 'react';
import { formatDate } from '../utils/formatDate';
import { Log } from '../utils/logger';

export default function NotificationCard({ notification, rank, score, reason }) {
  useEffect(() => {
    Log("frontend", "info", "component", `Notification card rendered for ID: ${notification.ID}`);
  }, [notification.ID]);

  // Determine card style based on Type
  let typeClass = "card-default";
  if (notification.Type === "Placement") typeClass = "card-placement";
  if (notification.Type === "Result") typeClass = "card-result";
  if (notification.Type === "Event") typeClass = "card-event";

  return (
    <div className={`notification-card ${typeClass}`}>
      <div className="card-header">
        <span className="card-rank">#{rank}</span>
        <span className="card-type">{notification.Type}</span>
      </div>
      <div className="card-body">
        <p className="card-message">{notification.Message}</p>
      </div>
      <div className="card-footer">
        <span className="card-time">{formatDate(notification.Timestamp)}</span>
        <div className="card-priority">
          <span className="priority-score">Score: {score.toFixed(1)}</span>
          <p className="priority-reason" title={reason}>{reason}</p>
        </div>
      </div>
    </div>
  );
}
