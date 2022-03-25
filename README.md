# Update a Task
* The most functionality of CRUD requests
* We are looking for the id
* But we also need the req.body (because we are updating something)
* And we'll also need to pass in some options because by default, we won't get our validators working
* And we won't get the task we just updated

```
const updateTask = async (req, res) => {
  try {
    // grab the id parameter from the URL
    const { id: taskId } = req.params

    // pass in the data we are updating from the request body
    res.status(200).json({ id: taskId, data: req.body })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

```
## Test in Postman

### Grab the id from Get All Tasks request
* And append to endpoint

`{{URL}}/tasks/621413d45cfb1b9270e560f8`

* Postman will output your id with something similar to this:
* We see no data (empty object) and this is because we haven't sent anything from my frontend

```
{
    "id": "621413d45cfb1b9270e560f8",
    "data": {}
}
```

* Now modify our Postman to send some data from our front end and our current task we are updating looks like this:

```
{
            "_id": "621413615cfb1b9270e560f6",
            "name": "tasks",
            "completed": true,
            "__v": 0
        },
```

* And let's update the body

1. In postman choose `Body` 
2. Choose `raw` from dropdown 
3. Choose `JSON` from dropdown
4. Add the following as the body

```
{
    "name": "run without scissors",
    "completed": false
}
```

* And you will see the following returned:

```
{
    "id": "621413d45cfb1b9270e560f8",
    "data": {
        "name": "run without scissors",
        "completed": false
    }
}
```

## Now update the Task model document
```
const updateTask = async (req, res) => {
  try {
    // grab the id parameter from the URL
    const { id: taskId } = req.params

    // search for task
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body)

    // check if task id exists
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }

    // pass in the data we are updating from the request body
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

* Run the Update Task request again and now you'll get something similar to this returned:

```
{
    "task": {
        "_id": "621413d45cfb1b9270e560f8",
        "name": "run to top of hill",
        "completed": false,
        "__v": 0
    }
}
```

### This is an important point
* You make a change but what you see back was before the change, most of the time you want to see what the new update looks like and you don't care about the old update
* And if you click the get all tasks you will see that the record was updated

### How to fix this
* Pass in the options

#### We want to do two things with the options
1. We want to get the new update back (override the default behavior)
2. We want to run our validators (that we set up in our model)

### Add the options parameter
* It is the 3rd parameter

```
const updateTask = async (req, res) => {
  try {
    // grab the id parameter from the URL
    const { id: taskId } = req.params

    // search for task
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true, // will return the new item that was updated
      runValidators: true, // no explanation needed as this is obvious as to what it does
    })

    // check if task id exists
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }

    // pass in the data we are updating from the request body
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

## Run in postman again
* You will see we get the latest value updated
* We see our validators are working
