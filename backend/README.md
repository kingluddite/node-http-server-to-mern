# Expanding to create a new custom error class
* Now we will go back to our getTask and set it up in a way that we don't have to write this all the time manually for all controllers

```
const getTask = asyncWrapper(async (req, res, next) => {
  // destructure and use alias for improve code readability
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })
  // check if we found a task with that id
  if (!task) {
    // we can create a new error object if we run the built-in JavaScript error constructor
    const error = new Error('Not Found')
    error.status = 404
    // we could log out the error here but since we have our asyncWrapper we can us next by just adding a third argument of next
    return next(error)
    // return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }

  // we get here all is well and 200 means success
  res.status(200).json(task)
})

```

## We will create a new custom error class
* And we'll extend if from the JavaScript error
* And then we'll create the new instance

`errors/custom-error.js`

```
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }
```

## Require it
```
// MORE CODE

const { createCustomError } = require('../errors/custom-errors.js')

// MORE CODE
```

## Use it
* Before the change:

```
// MORE CODE

const getTask = asyncWrapper(async (req, res, next) => {
  // destructure and use alias for improve code readability
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })
  // check if we found a task with that id
  if (!task) {
    // we can create a new error object if we run the built-in JavaScript error constructor
    const error = new Error('Not Found')
    error.status = 404
    // we could log out the error here but since we have our asyncWrapper we can us next by just adding a third argument of next
    return next(error)
    // return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }

  // we get here all is well and 200 means success
  res.status(200).json(task)
})

// MORE CODE
```

* And after the change
 ```
// MORE CODE

const getTask = asyncWrapper(async (req, res, next) => {
  // destructure and use alias for improve code readability
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })
  // check if we found a task with that id
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }

  // we get here all is well and 200 means success
  res.status(200).json(task)
})

// MORE CODE
```

## Update the other errors in the controller with same code

## Update our error handler to use our custom error class
* And use default if we are not

```
// MORE CODE

// we import the class we created
// because we are going to check if the err we are using is an instance of this class
const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  // check if error is instance of our custom error class
  if (err instanceof CustomAPIError) {
    // is an instance of our custom error class

    return res.status(err.statusCode).json({ msg: err.message })
  }
  // set up default error
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware

// MORE CODE
```

## Test in postman
* get a task with wrong prop format id
* And if you use bad formed id you will get default error `Something went wrong, please try again`
