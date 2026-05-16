import { Log } from './logger.js';

const API_BASE_URL = "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications(limit = 10, page = 1, notificationType = 'All') {
  Log("frontend", "info", "api", "Fetching notifications");

  try {
    const token = import.meta.env.VITE_ACCESS_TOKEN;

    if (!token) {
      Log("frontend", "error", "api", "Access token is missing");
      throw new Error("Access token is missing. Please add VITE_ACCESS_TOKEN in the .env file.");
    }

    const url = new URL(API_BASE_URL);
    if (limit) url.searchParams.append("limit", limit.toString());
    if (page) url.searchParams.append("page", page.toString());
    if (notificationType && notificationType !== 'All') {
      url.searchParams.append("notification_type", notificationType);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      Log("frontend", "error", "api", "Unauthorized access to notification API");
      throw new Error("Unauthorized (401): Please check your access token.");
    }

    if (!response.ok) {
      Log("frontend", "error", "api", `Notification API failed with status: ${response.status}`);
      throw new Error(`Failed to fetch notifications. Status: ${response.status}`);
    }

    const data = await response.json();
    Log("frontend", "info", "api", "Notification API fetch success");

    if (!data.notifications || !Array.isArray(data.notifications)) {
      Log("frontend", "error", "api", "Unexpected response shape from notification API");
      throw new Error("Unexpected response format from the server.");
    }

    return data.notifications;
  } catch (error) {
    Log("frontend", "error", "api", `Notification API fetch failure: ${error.message}`);
    throw error;
  }
}
