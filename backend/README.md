# Add Database connection
* `db/connect.js`

```
const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
```

## Log in to mongodb
* You only get one db per email
* Connect > Conect to app > grab string and place into `.env`, make sure to add your password and rename you Database to what you are building

`.env`

```
MONGO_URI=mongodb+srv://theadmin:HaZvZhnR3w0AvCsD@devconnector.a2gjt.mongodb.net/JOBS-API-DB?retryWrites=true&w=majority
```

* Then add to app

```
 // MORE CODE

// connectDB
const connectDB = require('./db/connect') // ADD THIS

 // MORE CODE

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // ADD THIS
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
```

* Run app and should work just as it did before but now we are connect to the Database

## Add user model

```
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    maxlength: 12,
  },
})

module.exports = mongoose.model('User', UserSchema)
```

## Validate - name, email, password - with mongoose
* This will allow us to send back nice error responses instead of those big objects
* We will hash the password (using bcryptjs)
* We then create a token
* We then send responses with that token

## Postman (PM)
* Create a new collection for jobs
* Create a new POST route `{{URL}}/auth/register`
* Add a body in PM

```
{
    "name": "joe",
    "email": "joe@example.com",
    "password": "secret"
}
```

* And test the route and you will see this response in postman because we just use `res.send('register user')`

## But we want to see the body sent back to PM so we change our route code from this:

```
// MORE CODE

const register = async (req, res) => {
  res.send('register user')
}

// MORE CODE
```

* To this: 
  
```
// MORE CODE

const register = async (req, res) => {
  res.json(req.body) // now we see this in PM
  // res.send('register user')
}

// MORE CODE
```

## Now we add our status codes
* Using our library

 ```
// MORE CODE

const register = async (req, res) => {
  res.status(StatusCodes.CREATED).json(req.body)
}

// MORE CODE
```

* And now you will see a status code of `201` in PM (we send back a successful creation of resource with a status code of `201`)

## Create a new User
* We use mongoose
* We want mongoose to do all the validation
* We spread (pass) the mongoose `create()` method to pass in all the fields

 ```
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user })
}

// MORE CODE
```

* Now we test and we create a new user
* **bad** we are storing our password (terrible security!!)

