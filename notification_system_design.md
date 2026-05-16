# Stage 2 - Notification System Design

## Objective
To build a responsive React frontend application that displays campus notifications, focusing on prioritizing important information via a sophisticated priority sorting algorithm.

## Frontend Architecture
- **Framework**: React (scaffolded via Vite)
- **Language**: JavaScript
- **Styling**: Native CSS without external UI libraries (ensuring a tailored and deeply customizable user interface)
- **State Management**: React `useState` and `useEffect` for fetching, storing, and filtering notifications locally.
- **Component Structure**: 
  - `Dashboard`: Orchestrates data fetching and passes props downwards.
  - `FilterBar`: UI controls for selecting limit and type.
  - `StatsPanel`: Displays quick metrics of the current notification list.
  - `NotificationCard`: Renders individual notification details and styling.
  - `EmptyState`: Fallback UI.

## Folder Structure
```
/
├── logging_middleware/
│   ├── logger.js
│   └── README.md
├── notification_app_fe/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NotificationCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── StatsPanel.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── logger.js
│   │   │   ├── priority.js
│   │   │   └── formatDate.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── screenshots/
├── notification_system_design.md
└── README.md
```

## API Integration
The application connects to a protected Notification API:
`GET http://4.224.186.213/evaluation-service/notifications`
It leverages the Fetch API and includes query parameters (`limit`, `page`, `notification_type`) allowing users to subset the data directly from the server.

## Authentication Approach
Both the Notification API and Logging API are protected routes. Authentication is achieved by passing an HTTP Bearer Token in the `Authorization` header. To prevent secrets from leaking into version control, the token is supplied via the local environment variable `VITE_ACCESS_TOKEN`, which is ignored by Git.

## Logging Middleware Design
A standalone `logging_middleware` package handles pushing application events to a remote logging server. 
- It validates the input stack (`frontend`), log level, and the specific module/package originating the log. 
- It gracefully falls back and handles network issues without breaking the user interface.
- It is wrapped within `notification_app_fe/src/utils/logger.js` to automatically inject the environment token.

## Priority Algorithm
Because users need to see critical notifications first, we don't rely solely on recency. Instead, a custom sorting utility (`src/utils/priority.js`) determines priority through three stages:
1. **Base Type Weight**: Placement (300) > Result (200) > Event (100).
2. **Keyword Boosts**: Keywords within the message trigger score additions (e.g., `hiring` +80, `test` +50).
3. **Recency Boost**: We parse the timestamp into a UNIX epoch and apply a fractional boost `(timestamp_ms / 1e11)`. This ensures that among items of the identical type and keyword value, the newer items naturally bubble to the top.

## Error Handling
- **Missing Token**: UI catches and shows a helpful error asking to populate the `.env`.
- **API Errors**: Displays a highly visible banner indicating network failure or 401 Unauthorized status.
- **Data Validation**: Fails gracefully and alerts users if the server's shape differs from the expected array structure.
- Every error state seamlessly passes information into the structured logging API for auditing.

## Responsiveness
Built entirely using Native CSS:
- Desktop (>1024px): 3 Column Grid
- Tablet (768px - 1024px): 2 Column Grid
- Mobile (<768px): 1 Column Grid

## How to run locally
1. `cd notification_app_fe`
2. Create `.env` file from `.env.example` and add your valid `VITE_ACCESS_TOKEN`
3. Run `npm install`
4. Run `npm run dev`

## Screenshots Checklist
- [ ] `screenshots/desktop-all-notifications.png`
- [ ] `screenshots/desktop-placement-filter.png`
- [ ] `screenshots/desktop-result-filter.png`
- [ ] `screenshots/desktop-event-filter.png`
- [ ] `screenshots/mobile-view.png`
- [ ] `screenshots/loading-or-error-state.png`
- [ ] `screenshots/postman-log-success.png`
