import Unauthorized from "@/core/modules/errors/Unauthorized";
import jwt from "jsonwebtoken";
import ms from "ms";
import get from "lodash/get";
import type { Request } from "express";

interface TokenProps<T extends jwt.JwtPayload = Auth.TokenPayload> {
  token: string;
  payload: T;
  expiresIn?: string | number;
}

const SECRET: string = process.env.JWT_SECRET || "secret";

class Token<T extends jwt.JwtPayload = Auth.TokenPayload> {
  public token: string;

  public payload: T;

  public get expired(): Date {
    return new Date(Number(this.payload.exp) * 1000);
  }

  constructor({ token, payload }: TokenProps<T>) {
    this.token = token;
    this.payload = payload;
  }

  public static extractFromReq(req: Request, throwOnAuthError = true) {
    const authQuery = get(req, "query.token", undefined);
    const authCookie = get(req, "cookies.token", undefined);
    const authHeader = get(req, "headers.authorization", undefined);

    let token: string | null = null;

    if (authQuery || authCookie) token = String(authCookie);

    if (authHeader) {
      const splitAuthorize = authHeader.split(" ");
      const allowedAuthorize = ["Bearer", "JWT", "Token"];

      if (
        splitAuthorize.length === 2 &&
        allowedAuthorize.includes(splitAuthorize[0])
      ) {
        token = splitAuthorize[1];
      }
    }

    // if token is not found in any of the above methods
    if (token) {
      try {
        return Token.verify(token);
      } catch (err: any) {
        if (throwOnAuthError) throw err;
      }
    }

    return null;
  }

  public static generate<DataPayload extends object = Auth.DataPayload>({
    expiresIn,
    data,
  }: {
    expiresIn: string | number;
    data: DataPayload;
  }) {
    const token = jwt.sign(data, SECRET, { expiresIn });

    const exp = typeof expiresIn === "string" ? ms(expiresIn) : expiresIn;

    return new Token({
      token,
      payload: { data, exp: Math.floor(Date.now() / 1000) + exp },
    });
  }

  public static verify<Payload extends object = Auth.TokenPayload>(
    token: string,
    secret?: string
  ) {
    const secretToken = secret || SECRET;

    try {
      const payload = jwt.verify(token, secretToken) as Payload;

      return new Token({ token, payload });
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError) {
        const type = "TOKEN EXPIRED";
        const message = err.message;

        console.app.error(type, message);
        throw new Unauthorized(message);
      }

      if (err instanceof jwt.JsonWebTokenError) {
        const type = "INVALID TOKEN";
        const message = err.message;

        console.app.error(type, message);
        throw new Unauthorized(message);
      }

      if (err instanceof jwt.NotBeforeError) {
        const type = "TOKEN NOT ACTIVE";
        const message = err.message;

        console.app.error(type, message);
      }

      throw new Unauthorized();
    }
  }
}

export default Token;
