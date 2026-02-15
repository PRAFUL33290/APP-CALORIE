const requests = new Map();

export function rateLimiter(req, res, next) {
  const userId = req.userId;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  if (!requests.has(userId)) {
    requests.set(userId, []);
  }

  const userRequests = requests.get(userId).filter(time => now - time < windowMs);
  requests.set(userId, userRequests);

  if (userRequests.length >= maxRequests) {
    return res.status(429).json({
      error: 'Limite de requêtes atteinte. Maximum 10 analyses par heure.',
    });
  }

  userRequests.push(now);
  next();
}
