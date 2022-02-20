const express = require('express')
// initialize express and invoke it
const app = express()
const tasks = require('./routes/tasks')

// middleware
// get access to data in req.body
app.use(express.json())

// home route
app.get('/', (req, res) => {
  res.send('home page')
})

app.use('/api/v1/tasks', tasks)
// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.path('/api/v1/tasks/:id')   - get single task
// app.delete('/api/v1/tasks/:id') - delete task

// using api
// using v1 for version
// example - https://hn.algolia.com/api

const port = 3000
app.listen(port, console.log(`server is listening on port ${port}`))
