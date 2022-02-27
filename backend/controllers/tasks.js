const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-errors.js')
const getAllTasks = asyncWrapper(async (req, res) => {
  // let's throw an error
  throw new Error('testing async errors')
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
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }

  // we get here all is well and 200 means success
  res.status(200).json(task)
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOneAndDelete({ _id: taskId })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
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
    return next(createCustomError(`No task with id : ${taskId}`, 404))
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
    return next(createCustomError(`No task with id : ${taskId}`, 404))
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
