# Logging Middleware

A reusable JavaScript logging middleware designed to integrate with the centralized Logging API.

## API Endpoint
This middleware interacts with the following endpoint:
`POST http://4.224.186.213/evaluation-service/logs`

## Purpose
It provides a safe, standardized way to log events from both frontend and backend applications without relying on `console.log`. It includes input validation to ensure the submitted logs adhere strictly to the system's requirements.

## Function Signature

```javascript
export async function Log(stack, level, packageName, message, token)
```

## Allowed Values

- **stack**: `frontend`, `backend`
- **level**: `debug`, `info`, `warn`, `error`, `fatal`
- **package**:
  - *Frontend specific*: `api`, `component`, `hook`, `page`, `state`, `style`
  - *Backend specific*: `cache`, `controller`, `cron_job`, `db`, `domain`, `handler`, `repository`, `route`, `service`
  - *Common to both*: `auth`, `config`, `middleware`, `utils`

## Error Handling
The middleware will gracefully handle:
- Missing token
- Invalid inputs (stack, level, package, message)
- Unsuccessful API responses (401 Unauthorized, non-200 status)
- Network connectivity issues
In the event of an error, it will return a structured JSON object `{ success: false, error: "error message" }` rather than crashing the application.

## Frontend Usage Example

In a typical frontend scenario (like Vite + React), we do not want to pass the token manually everywhere. We create a wrapper that reads from the `.env` variable (`VITE_ACCESS_TOKEN`):

```javascript
import { Log as BaseLog } from '../../logging_middleware/logger.js';

export async function Log(stack, level, packageName, message) {
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  return await BaseLog(stack, level, packageName, message, token);
}
```

Then use the wrapper across components:

```javascript
import { Log } from './utils/logger.js';

Log("frontend", "info", "page", "Dashboard page loaded");
```
