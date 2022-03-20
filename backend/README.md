# Verify JWT Token
`controllers/main.js`

* We need to verify our token and here we'll decode the token and show what's inside it

```
// MORE CODE

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // should error with 'Invalid Credentials'
    // should pass 400 and not 401
    // 400 is authentication error
    // 401 is bad request error
    // we'll use "no token provided" to make it easier to debug
    throw new CustomAPIError('No token provided', 401)
  }

  // grab token
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }

  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

// MORE CODE
```

* And that will log out
  * All of this comes from our payload when we sign the token

```
{ id: 18, username: 'jim', iat: 1647635082, exp: 1650227082 }
```

* Now we can plugin in our dynamic data

```

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // should error with 'Invalid Credentials'
    // should pass 400 and not 401
    // 400 is authentication error
    // 401 is bad request error
    // we'll use "no token provided" to make it easier to debug

    throw new BadRequestError('No token provided', 401)
    // throw new CustomAPIError('No token provided', 401)
  }

  // grab token
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
  } catch (error) {
    throw new BadRequestError('Not authorized to access this route', 401)
    // throw new CustomAPIError('Not authorized to access this route', 401)
  }
}
```
* We can log in in client and enter username and password, then see the token in CDTs, then when we make those following requests for private data via the `Get Data` button and it will show the name and update the lucky number each time we click because our token is present

### Security precaution
* If person does not provide username and password and submits form, we have functionality that removes the token from localStorage


