## Add http-status-codes
`$ npm i http-status-codes`

* [docs](https://www.npmjs.com/package/http-status-codes)
`controllers/main.js`

```
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}

```

`errors/custom-error.js`

```
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    // this.statusCode = statusCode
  }
}

module.exports = CustomAPIError

```

`errors/bad-request.js`

```
const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError

```

`errors/unauthenticated.js`

```
const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UnauthenticatedRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedRequestError

```

`middlewares/auth.js`

```
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

```



