# Campus Notifications Frontend

## Overview
This repository contains the frontend implementation for the Campus Notifications Microservice. It presents a responsive, natively styled dashboard for viewing campus notifications. It integrates a protected backend Notification API and employs a custom priority sorting algorithm to surface critical announcements (like Placements and Results) to the top of the feed.

## Tech Stack
- **Framework**: React (Vite)
- **Language**: JavaScript
- **Styling**: Native CSS
- **Authentication**: Bearer Token via Environment Variables

## Folder Structure
- `logging_middleware/`: Contains the reusable javascript logging logic validating and pushing events to the server.
- `notification_app_fe/`: The main Vite React frontend application.
- `screenshots/`: Output images demonstrating various system states and UI designs.
- `notification_system_design.md`: Technical documentation of priority algorithm and system architecture.

## Setup Instructions
1. Clone the repository locally.
2. Navigate to `notification_app_fe` directory.
3. Install the dependencies using `npm install`.

## Environment Variables
The application relies on an access token to authenticate with the backend API.
1. Create a `.env` file in the `notification_app_fe/` directory.
2. Copy the contents of `.env.example` into `.env`.
3. Replace the placeholder with your actual Bearer token.
*Note: Ensure you never commit your actual `.env` file.*

## Run Command
Start the local development server:
```bash
cd notification_app_fe
npm run dev
```

## Build Command
Compile the application for production:
```bash
cd notification_app_fe
npm run build
```

## Logging Middleware Explanation
We employ a centralized logging strategy instead of relying on `console.log`. The logic resides in `logging_middleware/logger.js`. Every significant application event (page loads, API fetches, UI interactions) is structured and POSTed to the Logging API. This provides a robust audit trail and telemetry for monitoring system health securely.
