# Login
1. Check whether we get email and password and we'll get some kind of values, if not we'll send bad request
2. After that we check for the user in our Database, if we find one we'll send back user, if not we'll send back another error

## Create a new request in Postman
`POST {{URL}}/auth/login`

`controllers/auth.js`

```
// MORE CODE

const { BadRequestError, UnauthenticatedError } = require('../errors')

 // MORE CODE

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  // look for user
  const user = await User.findOne({ email })
  // compare password
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

// MORE CODE
```

* Sending this in body of postman (valid email and password of registered user)

```
{
    
    "email": "garrett@example.com",
    "password": "secret"
}

```
* Log without credentials and you get "please provide email and password"
* Login with correct email and password and you get the username in response and the token

## Test
* If you change the email to an invalid email you will get `Invalid Credentials` error
* TODO - but any password works

## Now we need to compare the password using our bcryptjs library
`models/User.js`

```
// MORE CODE

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrpt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)

// MORE CODE
```

## And check password

```
// MORE CODE

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  // look for user
  const user = await User.findOne({ email })
  // compare password
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

// MORE CODE
```
* Now test and a good email password works and a bad password shows credentials error

## Why did we check for email and password in controller?

`controllers/auth.js`

```
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
```

* Comment it out and we'll see why

```
const login = async (req, res) => {
  const { email, password } = req.body

  // if (!email || !password) {
  //   throw new BadRequestError('Please provide email and password')
  // }
```
* Now we are no longer checking for empty values and if you forget to add a password you will just see this in postman

```
{
    "err": {}
}
```
* Why is it empty?
* The comparePassword method will throw an error because we are passing in an empty value for password
* We are getting the error and we are handling the error (make this change)

`middlewares/error-handler.js`

```
// MORE CODE

const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err) // add this

// MORE CODE
```

* Now we see `Error: Illegal arguments: undefined, string` in the terminal
* So the long story short is that it is easier to just check for it inside our login controller
* Put code back to the way it was before checking for no password error without controller check

### 8000 error
* This is a mongo error meaning your password and email are incorrect
* **tip** Great way to check connection is click mongodb connection and try to log in via the terminal (if you can your string is correct, if not generate a new one)
