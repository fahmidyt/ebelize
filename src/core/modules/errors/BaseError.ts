import httpStatus from "http-status-codes";

class BaseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BaseError;
