// const CustomAPIError = require('../errors/custom-error')
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  // check if error is instance of our custom error class
  if (err instanceof CustomAPIError) {
    // is an instance of our custom error class

    return res.status(err.statusCode).json({ msg: err.message })
  }
  // set up default error
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
