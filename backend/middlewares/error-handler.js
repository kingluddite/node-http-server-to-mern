// we import the class we created
// because we are going to check if the err we are using is an instance of this class
const { CustomAPIError } = require('../errors/custom-errors')

const errorHandlerMiddleware = (err, req, res, next) => {
  // check if error is instance of our custom error class
  if (err instanceof CustomAPIError) {
    // is an instance of our custom error class

    return res.status(err.statusCode).json({ msg: err.message })
  }
  // set up default error
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
