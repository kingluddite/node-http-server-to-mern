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

const getTask = async (req, res) => {
  try {
    // destructure and use alias for improve code readability
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    // check if we found a task with that id
    if (!task) {
      // we didn't find a task with that id :(
      // MAKE SURE TO ALWAYS USE A RETURN HERE
      // if not you will send more than one response which will cause an ERROR
      // the `return` tells JavaScript you want to return from the function
      // resource not found is 404
      return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }

    // we get here all is well and 200 means success
    res.status(200).json(task)
  } catch (error) {
    // we get here and we have a server error :(
    res.status(500).json({ msg: error })
  }
}

const updateTask = (req, res) => {
  res.send('update task')
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }
    res.status(200).json({ task })
    // res.status(200).send()
    // res.status(200).json({ task: null, status: 'success' })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
