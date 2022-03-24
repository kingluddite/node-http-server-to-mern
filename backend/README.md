# Generate JWT (token)

`controllers/auth.js`

```
// MORE CODE

const jwt = require('jsonwebtoken')

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

// MORE CODE
```

* Test it out and you will see you send back the user's name and the token to the client

```
{
    "user": {
        "name": "dale5@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjNjZWYzMjY0NDFiNjVmNjM3ZWZhMDciLCJuYW1lIjoiZGFsZTVAZXhhbXBsZS5jb20iLCJpYXQiOjE2NDgxNjA1NjMsImV4cCI6MTY1MDc1MjU2M30.2a_WagNbuq6IBcuJsRcWafg-itfvqSz_Z2DtRUGqxqo"
}
```

## Frontend (react)
* [frontend repo](https://github.com/kingluddite/react-jobs-app)
* Create a user and view `Applications` tab
* It is stored in localStorage so when we refresh we still have access to the token

![see something like this](https://github.com/kingluddite/react-jobs-app)
