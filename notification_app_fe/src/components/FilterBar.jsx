import React from 'react';
import { Log } from '../utils/logger';

export default function FilterBar({ filter, setFilter, limit, setLimit, onRefresh }) {
  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilter(val);
    Log("frontend", "info", "component", `Filter changed to ${val}`);
  };

  const handleLimitChange = (e) => {
    const val = Number(e.target.value);
    setLimit(val);
    Log("frontend", "info", "component", `Limit changed to ${val}`);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="type-filter">Type:</label>
        <select id="type-filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Placement">Placement</option>
          <option value="Result">Result</option>
          <option value="Event">Event</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="limit-filter">Limit:</label>
        <select id="limit-filter" value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <button className="refresh-btn" onClick={onRefresh}>
        Refresh
      </button>
    </div>
  );
}
