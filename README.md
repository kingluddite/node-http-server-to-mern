# More on Error checking
* We are validating only using mongoose but we want to first check if we are passing the fields we have as required - best practice

 ```
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = {
  register,
  login,
}

```

* Yes it is repetitive but there are times when it may be needed
* If we just use mongoose we get a bigger object vs our controller validation where we send just `name, email and password are required` error message
* We will comment out the controller validation error for now because it is redundant but good to know about both for your future apps usecases

