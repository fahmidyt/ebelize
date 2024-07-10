import { rateLimit, type Options } from "express-rate-limit";

const rateLimitOptions: Partial<Options> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.", // message to send
  legacyHeaders: false, // disable X-RateLimit-Limit and X-RateLimit-Remaining headers
  standardHeaders: "draft-7", // enable standard rate limit headers
  keyGenerator: (req) => {
    if (req.user) return req.user.id; // generate a key for each request based on user ID (if authenticated

    if (req.clientIp) return req.clientIp; // generate a key for each request based on IP address

    // fallback to path and useragent
    return `${req.path}-${req.useragent?.browser ?? "unknown"}`;
  }, // generate a key for each request based on IP address
  validate: {
    ip: true, // enable IP address validation
  },
};

export default rateLimit(rateLimitOptions);
