# Mongoose instance methods
* [instance methods](https://mongoosejs.com/docs/guide.html#methods)

* They will be instances of our schema
* Every document we create we can have instances on them
* **benefit** Keep all our logic in one place where we have the user schema instead of spread out across all our controllers

## I want to add a way to get the user name
`models/User.js`

```
// MORE CODE

UserSchema.methods.getName = function () {
  // import to use regular function because `this` is tied to document
  return this.name
}

module.exports = mongoose.model('User', UserSchema)

// MORE CODE
```

* Then in the register controller we make this change from this:

```
// MORE CODE

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

// MORE CODE
```

* To this

```
// MORE CODE

  res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token })

// MORE CODE
```

* This shows us we can generate the name using the instance method itself
* This was just to show us how easy it is to use instance methods but we'll remove that code and use an instance method for something more practical

### sign a JWT
* Here is our current register controller

```
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

```

* Inside it we create our token in that controller with:

```
// MORE CODE

  const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  })

// MORE CODE
```

* We can make our code cleaner by removing this from the controller and tethering it directly to our User model using a instance method

### Remove token generation from our register controller
* Remove jwt import as we no longer need it

```
const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }

  const user = await User.create({ ...req.body })
  // for better security we should store the jwt secret in environment variables
  // remember you never want to store anything valuable inside the sign of the token
  
  // REMOVED CODE FROM HERE
  
  // send back the token instead of the user
  // lots of ways to do this
  // maybe your frontend just needs the token, or the token and the username
  // but you definately want to send back the token to the client because that will allow the user to access private resources later on
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
```

### Add an instance method
`models/User.js`

```
// MORE CODE

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, 'jwtSecret', {
    expiresIn: '30d',
  })
}

module.exports = mongoose.model('User', UserSchema)

// MORE CODE
```

* Now we invoke this instance method inside our controller

```
// MORE CODE

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }

  const user = await User.create({ ...req.body })
  // once we create the user we have that instance method
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

// MORE CODE
```

## Test
* Add a user and it works as it did before but our code is more robust
