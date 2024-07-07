import httpStatus from "http-status-codes";
import BaseError from "./BaseError";

class Unauthorized extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, httpStatus.UNAUTHORIZED);
  }
}

export default Unauthorized;
