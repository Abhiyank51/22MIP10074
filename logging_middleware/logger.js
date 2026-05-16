const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

const ALLOWED_STACKS = ["frontend", "backend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];
const COMMON_PACKAGES = ["auth", "config", "middleware", "utils"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];

export async function Log(stack, level, packageName, message, token) {
  try {
    if (!token) {
      return { success: false, error: "Missing authentication token for Log API" };
    }

    if (!ALLOWED_STACKS.includes(stack)) {
      return { success: false, error: `Invalid stack value: ${stack}` };
    }

    if (!ALLOWED_LEVELS.includes(level)) {
      return { success: false, error: `Invalid level value: ${level}` };
    }

    let isPackageValid = false;
    if (COMMON_PACKAGES.includes(packageName)) {
      isPackageValid = true;
    } else if (stack === "frontend" && FRONTEND_PACKAGES.includes(packageName)) {
      isPackageValid = true;
    } else if (stack === "backend" && BACKEND_PACKAGES.includes(packageName)) {
      isPackageValid = true;
    }

    if (!isPackageValid) {
      return { success: false, error: `Invalid package value '${packageName}' for stack '${stack}'` };
    }

    if (!message || typeof message !== 'string') {
      return { success: false, error: "Message must be a non-empty string" };
    }

    const payload = {
      stack,
      level,
      package: packageName,
      message
    };

    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 401) {
      return { success: false, error: "Unauthorized: Invalid or expired token" };
    }

    if (!response.ok) {
      return { success: false, error: `API Error: Received status ${response.status}` };
    }

    const data = await response.json().catch(() => null);

    return { success: true, data };

  } catch (error) {
    // Only console warn as a fallback if the fetch itself fails
    console.warn("Log API fetch failed:", error.message);
    return { success: false, error: `Network Error: ${error.message}` };
  }
}
