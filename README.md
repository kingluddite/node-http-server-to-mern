# getAllTasks
* We pass in find() the empty object which gives us all the documents in the collection
* If we are successful (there is no error), we send 200 success message, send back JSON and then we jam all of our tasks inside of the empty object and set it equal to the tasks property

* `res.status(200).json({ tasks: tasks});`

```
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
```


