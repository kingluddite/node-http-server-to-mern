# Catching Errors
* In Express site - http://expressjs.com/en/guide/error-handling.html#error-handling - type "error" in search box and click on default error handler

## If you are wondering where the error we saw
* When we tried to enter an empty string and create a task
* It is the default error handler in express:

```
The default error handler
Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.
```

## Now search for "Writing error handlers"
* We will set up another set of middleware
* But in this case the middleware will handle errors
* If we want to handle errors we pass in 4 arguments (the first argument will be that error)
* And we'll place this error handler at the very end of our routes

```
Writing error handlers
Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next). For example:
```

```
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

* **important** You define error-handling middleware last, after other app.use() and routes calls
* In the sample code of Express they drop error handler in server.js main file but we will stay organized and put it inside our `middlewares` folder

`middlewares/error-handler.js`

```
const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: err })
}

module.exports = errorHandlerMiddleware
```

`server.js`

```
// MORE CODE

const errorHandler = require('./middlewares/error-handler')
// middleware
app.use(express.static('./public'))

// get access to data in req.body
app.use(express.json())

// home route
// app.get('/', (req, res) => {
//   res.send('home page')
// })

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

// MORE CODE
```

## Test in Postman
* That will give you a long error in Postman when you try to submit a task with an empty string

### If you want to make your error shorter
`error-handler.js`

```
const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: `Something went wrong. Try again later.` })
}

// MORE CODE
```

