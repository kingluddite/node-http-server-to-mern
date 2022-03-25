# Add routes and controllers to app

 ```
// MORE CODE

const app = express()

// connectDB

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler

// MORE CODE

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)

// MORE CODE
```

* And your endpoints for auth will be:

```
const express = require('express')
const router = express.Router()

const { login, register } = require('../controllers/auth')

// domain/api/v1/auth/register
router.post('/register', register)
// domain/api/v1/auth/login
router.post('/login', login)

module.exports = router
```


