const Task = require('../models/Task')
const getAllTasks = (req, res) => {
  res.send('all items from the file')
}

// we are communicating with Database
// we use async / await
const createTask = async (req, res) => {
  const task = await Task.create(req.body)
  // if you don't put task inside an object
  // in the response you will get error "headers already sent"
  res.status(201).json({ task })
  // res.json(req.body)
}

const getTask = (req, res) => {
  res.json({ id: req.params.id })
}

const updateTask = (req, res) => {
  res.send('update task')
}

const deleteTask = (req, res) => {
  res.send('delete task')
}
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
