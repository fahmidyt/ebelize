import { rateLimit, type Options } from "express-rate-limit";

const rateLimitOptions: Partial<Options> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.", // message to send
  legacyHeaders: false, // disable X-RateLimit-Limit and X-RateLimit-Remaining headers
  standardHeaders: "draft-7", // enable standard rate limit headers
};

export default rateLimit(rateLimitOptions);
