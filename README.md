# Encrypt Password
* **BEST PRACTICE** never store user passwords as string
* sadly people use the same password for everythinga

## hash password
* This is generate random bytes and combining it with the password before we pass it through the hash function a mathematical algo that maps data of any size to a bit string of fixed size
* **note** hashing is a one-way street (this means it cannot be reversed)
* If the input changes even a tiny bit the resulting hash will be completely different
  * This is good for two reasons because we can store passwords in a form that protects them even if the password itself is compromised and at that same time being able to verify the correct username and password

## we are using bcryptjs
`$ npm i bcryptjs`

* there is also a library called `bcrypt` but with node `bcryptjs` seems to work better in my experience

## Temp user object
* We won't dump the entire user object but just make a temp with name email and pw
* We get an error because we create a hash that is a lot longer than the password max we set of 12, in the User schema - we remove that and as long as our email is unique and we provide the 3 values required, we create a new user storing the hashed and salted password in our Database

```
// MORE CODE

const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const tempUser = { name, email, password: hashedPassword }

  const user = await User.create({ ...tempUser })
  res.status(StatusCodes.CREATED).json({ user })
}

// MORE CODE
```



