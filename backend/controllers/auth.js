const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }

  const user = await User.create({ ...req.body })
  // for better security we should store the jwt secret in environment variables
  // remember you never want to store anything valuable inside the sign of the token
  const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  })
  // send back the token instead of the user
  // lots of ways to do this
  // maybe your frontend just needs the token, or the token and the username
  // but you definately want to send back the token to the client because that will allow the user to access private resources later on
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = {
  register,
  login,
}
