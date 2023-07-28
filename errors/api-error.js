// api error 
class ApiError extends Error {
  statusCode;
  constructor(statusCode, message, stack = '') {
    super(message)
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack
    }
    else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = ApiError;