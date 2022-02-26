# Add custom error class
* We will work on our 404 responses

## Set up a custom error class
* This will extends from the general javascript error class and that way we can handle all of our 404 responses in our newly created error handler as well

### Let's use getTask controller to show how this will work

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
```

* And now we can log out the error

```
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ msg: err.message })
}

module.exports = errorHandlerMiddleware

```

* And try to find a task that had correctly formatted _id but wrong alter letter of _id to get a resource not found error in the getTask controller

### And we can also update our status dynamically like this:
* You will see the 404 error in Postman

```
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  return res.status(err.status).json({ msg: err.message })
}
```
