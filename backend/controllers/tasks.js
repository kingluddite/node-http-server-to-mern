const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/async')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

// we are communicating with Database
// we use async / await
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

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

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOneAndDelete({ _id: taskId })
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }
  res.status(200).json({ task })
  // res.status(200).send()
  // res.status(200).json({ task: null, status: 'success' })
})

const updateTask = asyncWrapper(async (req, res) => {
  // grab the id parameter from the URL
  const { id: taskId } = req.params

  // search for task
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true, // will return the new item that was updated
    runValidators: true, // no explanation needed as this is obvious as to what it does
  })

  // check if task id exists
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }

  // pass in the data we are updating from the request body
  res.status(200).json({ task })
})

const editTask = asyncWrapper(async (req, res) => {
  // grab the id parameter from the URL
  const { id: taskId } = req.params

  // search for task
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true, // will return the new item that was updated
    runValidators: true, // no explanation needed as this is obvious as to what it does
    overwrite: true, // tell Mongoose to overwrite the properties (because we are using the PUT method)
  })

  // check if task id exists
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }

  // pass in the data we are updating from the request body
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
}
