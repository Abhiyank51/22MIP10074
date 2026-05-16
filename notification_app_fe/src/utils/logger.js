import { Log as BaseLog } from '../../../logging_middleware/logger.js';

export async function Log(stack, level, packageName, message) {
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  return await BaseLog(stack, level, packageName, message, token);
}
