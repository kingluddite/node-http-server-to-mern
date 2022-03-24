# Mongoose pre hooks
* Our controller can get really long so adding middleware can make it less long
* we will use the mongoose `pre` hook

## Important
* When working with mongoose `pre` hook use regular function (function keyword value) and not arrow functions and the reason is `this` will be scoped to our document

```
// MORE CODE

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // ADD!

const UserSchema = new mongoose.Schema({
 // MORE CODE

})

// import to use function keyword and not arrow function
// to ensure `this` is scoped to document
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model('User', UserSchema)
```

* And we can clean up our controller to be this

```
 // MORE CODE

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }

  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user })
}
 // MORE CODE
```

* And it works the same but it is much, much cleaner
* **problem** When we create a new user we don't want to send a password back to the client (BAD PRACTICE)

## New with mongoose 5
* We can use async await and that means this code

```
// MORE CODE

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// MORE CODE
```

* Can remove the `next` and it still works: (see below)

```
// MORE CODE

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// MORE CODE
```

![no next needed in mongoose 5](https://i.imgur.com/tXmKmPL.png)

* [mongoose docs](https://mongoosejs.com/docs/middleware.html#pre)

## Test it out and it works the same without next




