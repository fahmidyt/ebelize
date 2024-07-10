import httpStatus from "http-status-codes";
import BaseError from "./BaseError";

class BadRequest extends BaseError {
  constructor(message = "Bad Request") {
    super(message, httpStatus.BAD_REQUEST);
  }
}

export default BadRequest;
