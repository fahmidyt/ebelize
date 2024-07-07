import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Auth {
    interface DataPayload {
      /**
       * User ID
       */
      id: string;

      /**
       * User email
       */
      email: string;
    }

    interface TokenPayload extends JwtPayload {
      data: DataPayload;
    }
  }
}

export {};
