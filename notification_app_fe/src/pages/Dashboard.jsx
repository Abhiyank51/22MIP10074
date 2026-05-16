import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../utils/api';
import { sortByPriority, getPriorityScore } from '../utils/priority';
import { Log } from '../utils/logger';

import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import StatsPanel from '../components/StatsPanel';
import EmptyState from '../components/EmptyState';

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filter, setFilter] = useState('All');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    Log("frontend", "info", "page", "Dashboard loading notifications");

    try {
      const data = await fetchNotifications(limit, page, filter);
      const sortedData = sortByPriority(data);
      setNotifications(sortedData);
      
      if (sortedData.length === 0) {
        Log("frontend", "warn", "page", "Empty notification list received");
      }
    } catch (err) {
      setError(err.message);
      Log("frontend", "error", "page", `Dashboard failed to load notifications: ${err.message}`);
    } finally {
      setLoading(false);
      Log("frontend", "info", "page", "Dashboard finished loading notifications");
    }
  };

  useEffect(() => {
    Log("frontend", "info", "page", "Dashboard page mounted");
    loadNotifications();
  }, [filter, limit, page]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Campus Notification Center</h1>
        <h2>Priority Inbox</h2>
      </header>

      <StatsPanel notifications={notifications} filter={filter} />

      <FilterBar 
        filter={filter} 
        setFilter={setFilter} 
        limit={limit} 
        setLimit={setLimit} 
        onRefresh={loadNotifications} 
      />

      <main className="dashboard-content">
        {loading && <div className="loading-spinner">Loading notifications...</div>}
        
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && notifications.length === 0 && (
          <EmptyState message="No notifications found matching your criteria." />
        )}

        {!loading && !error && notifications.length > 0 && (
          <div className="notifications-grid">
            {notifications.map((notif, index) => {
              const priorityData = getPriorityScore(notif);
              return (
                <NotificationCard 
                  key={notif.ID} 
                  notification={notif} 
                  rank={index + 1}
                  score={priorityData.score}
                  reason={priorityData.reason}
                />
              );
            })}
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>Evaluation - Frontend Track</p>
      </footer>
    </div>
  );
}
