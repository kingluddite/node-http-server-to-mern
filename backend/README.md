# Express Server
* Add controllers and routers folder for better structure
* View this endpoint - http://localhost:3000/api/v1/tasks and you will see 'all items from the file'

## POSTMAN
* Darkmode
* Global Variables in routes

## Routes
```
```
app.get('/api/v1/tasks')        - get all the tasks
app.post('/api/v1/tasks')       - create a new task
app.path('/api/v1/tasks/:id')   - get single task
app.delete('/api/v1/tasks/:id') - delete task

* Hit this endpoint - http://localhost:3000/api/v1/tasks
* You will see all items
* break up routes into controllers and routes folders
* add middleware with `app.use(express.json())` to access `req.body` data
