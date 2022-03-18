# JSON web tokens basics
* So far all our routes are "public"

## What do we mean by public?
* Anyone can access them and use them however they want
* We don't want random people to access our data

## How can we restrict the access?
* A popular method is to use JWT (JSON Web Token)
* **tip** Think of them as long strings

### Examples
* Dashboard is protected
  * I can click all day long and not get the data unless I am logged in
  * When I log in is when I get the token
* Login and Registration page are public

## IMPORTANT TO GRASP THE MAIN CONCEPT
* ALWAYS REMEMBER - if a valid token is present in their request, the user can access specific info
  * Not all of the info, you can only access the info that belongs to you
  * If we have a restricted route, like we have with Dashboard, if the token is not present, or not valid, the server (us) will kick back the error response (and this is essentially how we restrict access to certain routes (aka certain "resources"))
  * Remember a login is not restricted, anyone can try to login

`controllers/main.js`

```
const login = async (req, res) => {
  res.send('Fake Login/Register/Signup')
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}

```

`routes/main.js`

 ```
const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

router.route('/dashboard').get(dashboard)
router.route('/login').post(login)

module.exports = router

```

`app.js`

```
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./routes/main') // ADD THIS!
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', mainRouter) // ADD THIS!
app.use(notFoundMiddleware)

// MORE CODE
```

## In postman create two requests
* GET Dashbaord `{{URL}}/dashboard`
* Test - will get you

```
{
    "msg": "Hello, John Doe",
    "secret": "Here is your authorized data, your lucky number is 81"
}
```

* POST Login `{{URL}}/login`
* Test - will get you

`Fake Login/Register/Signup`

* But with POST requests we want to send data in the body

```
{
    "username": "john",
    "password": "secret"
}
```

## Big picture
1. check username and password in post(login) request
2. if both exist create a new JWT
3. send JWT to frontend (since the frontend needs to access it in order to send another request - in order to send the get request where essentially we display this secret information )

4. (on our end we want to set up the authentication) setup authentication so only the request with JWT can access the dashboard

## grab the username and password
* But we can send no values (we need to prevent this with validation)

`controllers/main.js`

 ```
// MORE CODE

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  res.send('Fake Login/Register/Signup')
}
// MORE CODE
```

* Test in PM and you will see the values you entered in terminal
* If you sent empty data you will get `undefined` for whatever fields were not filled in

## Validation
1. `once we have a mongodb` - We can first check to see if username and password are provided to mongodb via mongoose by making them required fields in the mongoose schema
2. Joi - We can setup the entire additional layer of validation (it will set in front of all of our requests) - https://www.npmjs.com/package/express-joi-validation
3. We can check for both values in our controllers
  * if we don't send a username or a password we'll send client an error response - and in our case we have a package that wraps all of our routes and we simply want to throw an error (what error? Our Custom Error - CustomAPIError - where we'll say hey you didn't provide both the values we need so we'll send a 400 response which is a bad request) - we will set this up now

`controllers/main.js`

```
// MORE CODE

const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || password) {
    throw new CustomAPIError('Please provide email and password', 400)
  }
  console.log(username, password)
  res.send('Fake Login/Register/Signup')
}

// MORE CODE
```

* Test with no username and/or password  in PM and you'll get this in PM 
  
```
{
    "msg": "Please provide email and password"
}
```

![diagram of req res](https://i.imgur.com/osX4BHa.png)

![jwt diagram](https://i.imgur.com/D2xqt41.png)

1. Login request to server
2. Server sends back a response + signed JWT
3. Then user can send a request + the signed jwt
4. And the server will send back a response

JWT is just a way to exchange data between two parties (frontend app and our api is are common two parties)
JWT is better than some random string, because JWT has a security feature, where we can be sure about the integrity of our data, if the token passes the validation, it means its the same token that we sent to the client and the data wasn't tampered with
  * This information can be verified and trusted because it is digitally signed using a secret (with the HMAC algo) or a public/private key pair using RSA or ECDSA
* HTTP is stateless, that is a feature of HTTP - that means the server does not know or remember any previous request sent by the same client, so that means we always have to provide a valid token with every request otherwise the access will be denied

### Analyze the JWT
* jwt.io (great site)

#### Three parts
* Header
* Payload
* Signature

##### secret
* We'll store the secret on the server

##### What we send back to the frontend
* Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the `Authorization` header using the `Bearer schema`

`Authorization: Bearer <token>`

### What jwt package to use?
* There are several
* We'll use `jsonwebtoken`

`$ npm i jsonwebtoken`
