const CustomAPIError = require('./custom-error')

class UnauthenticatedRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

module.exports = UnauthenticatedRequestError
