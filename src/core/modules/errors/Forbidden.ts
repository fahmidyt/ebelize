import httpStatus from "http-status-codes";
import BaseError from "./BaseError";

class Forbidden extends BaseError {
  constructor(message = "Forbidden") {
    super(message, httpStatus.FORBIDDEN);
  }
}

export default Forbidden;
