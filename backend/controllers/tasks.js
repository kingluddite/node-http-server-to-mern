const getAllTasks = (req, res) => {
  res.send('all items from the file')
}

const createTask = (req, res) => {
  // here we test out if our middleware is working
  // we added Body in postman > raw > JSON and sent this:
  // {
  //   "name": "tasks"
  // }
  // hit send in postman and the above JSON is what you will see
  // but we could also send this

  res.json(req.body)
  // res.send('create a new task')
}

const getTask = (req, res) => {
  // res.send('get single task')
  // with endpoint {{URL}}/tasks/1 the body returns in postman:
  // {
  //   "id": "1"
  // }
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
