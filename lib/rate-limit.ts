type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
};

const requests = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string, options: RateLimiterOptions) {
  const now = Date.now();
  const record = requests.get(ip);

  // Clean up old records periodically
  if (requests.size > 1000) {
    for (const [key, value] of requests.entries()) {
      if (value.expiresAt < now) {
        requests.delete(key);
      }
    }
  }

  if (!record || record.expiresAt < now) {
    // First request or expired window
    requests.set(ip, {
      count: 1,
      expiresAt: now + options.windowMs,
    });
    return { success: true };
  }

  if (record.count >= options.maxRequests) {
    // Rate limit exceeded
    return { success: false };
  }

  // Increment request count
  record.count += 1;
  requests.set(ip, record);
  return { success: true };
}
