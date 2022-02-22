// https://www.youtube.com/watch?v=qwfE7fSVaZM&t=1384s
const express = require('express')
// initialize express and invoke it
const app = express()
const tasks = require('./routes/tasks')
// we invoke connectDB
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.static('./public'))

// get access to data in req.body
app.use(express.json())

// home route
// app.get('/', (req, res) => {
//   res.send('home page')
// })

app.use('/api/v1/tasks', tasks)
// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.put('/api/v1/tasks/:id')   - get single task
// app.delete('/api/v1/tasks/:id') - delete task

// using api
// using v1 for version
// example - https://hn.algolia.com/api

// only if we can connect to the Database server we then spin up the express server
// because connectDB returns a Promise we can use async/await

const port = 3000
const start = async () => {
  // anytime you have an asynchronous operation it is very useful to
  // use a try/catch so that if there is an error we can handle it as well
  // since connectDB returns a Promise we use the await keyword
  try {
    await connectDB(process.env.MONGO_URI)
    // only if we are successful do we spin up the Express server
    app.listen(port, console.log(`server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

// run our start() to determin if we have a Database connection before we spin up our Express server
start()

// we no longer see an log telling us our Database connection was successful but if you want to make sure that is working put in a bad password
