import React from 'react';

export default function StatsPanel({ notifications, filter }) {
  const total = notifications.length;
  const placementCount = notifications.filter(n => n.Type === 'Placement').length;
  const resultCount = notifications.filter(n => n.Type === 'Result').length;
  const eventCount = notifications.filter(n => n.Type === 'Event').length;

  return (
    <div className="stats-panel">
      <div className="stat-card">
        <h3>Total Loaded</h3>
        <p className="stat-value">{total}</p>
      </div>
      <div className="stat-card">
        <h3>Placements</h3>
        <p className="stat-value text-placement">{placementCount}</p>
      </div>
      <div className="stat-card">
        <h3>Results</h3>
        <p className="stat-value text-result">{resultCount}</p>
      </div>
      <div className="stat-card">
        <h3>Events</h3>
        <p className="stat-value text-event">{eventCount}</p>
      </div>
      <div className="stat-card">
        <h3>Active Filter</h3>
        <p className="stat-value text-filter">{filter}</p>
      </div>
    </div>
  );
}
