const jwt = require('jsonwebtoken')
// const CustomAPIError = require('../errors/custom-error')
const { UnauthenticatedError } = require('../errors')
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  // grab token
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
    // throw new CustomAPIError('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
