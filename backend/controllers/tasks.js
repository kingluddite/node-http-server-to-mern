const Task = require('../models/Task')
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    // we send back the object
    // inside the object there is a property by the name of "tasks"
    // res.status(200).json({ tasks: tasks })
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

// we are communicating with Database
// we use async / await
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
  // if you don't put task inside an object
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
