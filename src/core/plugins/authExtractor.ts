import Token from "@/utils/token";
import type { NextFunction, Request, Response } from "express";

// augments the Express Request object to include the user object
declare global {
  namespace Express {
    interface Request {
      user?: Auth.DataPayload;
    }
  }
}

// implements a middleware to extract the user object from the token
function authExtractor(req: Request, res: Response, next: NextFunction) {
  const token = Token.extractFromReq(req);

  if (token) req.user = token.payload.data;

  next();
}

export default authExtractor;
