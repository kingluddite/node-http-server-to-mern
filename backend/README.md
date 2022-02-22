# getTask
* Get a single task

## findOne()
* [findOne() docs](https://mongoosejs.com/docs/api.html#model_Model.findOne)
## We need to search by _id so run getAllTasks in postman and pick one _id and add that _id to the end of your Get Single Task request

`{{URL}}/tasks/621413d45cfb1b9270e560f8`

* Run in postman and if you get that long string id returned it is working
* We could console.log() in our code but more convenient to see those logs in postman

```
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
```

## Test in Postman
* Hit send and you should get one request task back because the _id matched your query
