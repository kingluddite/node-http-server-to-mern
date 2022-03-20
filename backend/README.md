# Setup Authentication Middleware
* We need a way to send our autentication to every protected route in a more efficient manner
e

```
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  // grab token
  const token = authHeader.split(' ')[1]
```

* We'll take the above chunk of code, put it inside it's own middleware and then add it to any protected route

## Let's set it up and test if we get the authorization in headers
`/middlewares/auth.js`

```
const authenticationMiddleware = async (req, res, next) => {
  // remember to get to next middleware (in our case here a dashboard route, we need to use "next" function)
  console.log(req.headers.authorization)
  next()
}

module.exports = authenticationMiddleware
```

### Where are we going to use this middleware?
* In our protected dashboard
* So we just import our auth middleware into our routes and stick it before we call our dashboard controller

`routes/main.js`

```
// MORE CODE

const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middlewares/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
// router.route('/dashboard').get(dashboard)
router.route('/login').post(login)

module.exports = router

// MORE CODE
```

* Now everytime someone hits our dashboard route, they will be hitting our auth middleware, and because we have `next` then we'll go to our dashboard

## Test it out
* If you log in without credentials you will get Not authorized to access theis route and you will see `Bearer null` logged out to the terminal
* If you log in with credentials you will see `Bearer <and your token here>` logged out to the terminal


## Rework our code to make the auth have all we need to authenticate the dashboard route inside it

`middlewares/auth.js`

```
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  // grab token
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
    // throw new CustomAPIError('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
```

* And we update our dashboard

`controllers/main.js`

```
// MORE CODE

const dashboard = async (req, res) => {
  console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

// MORE CODE
```

## Test it out
* if we log in and then click Get data we'll see this in our terminal console

```
{ id: 20, username: 'asdf' }
```


