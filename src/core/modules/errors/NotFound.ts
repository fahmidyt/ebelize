import httpStatus from "http-status-codes";
import BaseError from "./BaseError";

class NotFound extends BaseError {
  constructor(message = "Not Found") {
    super(message, httpStatus.NOT_FOUND);
  }
}

export default NotFound;
