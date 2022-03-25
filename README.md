# PUT Vs PATCH request
```
// here we review adding a PUT request
// difference between PUT and PATCH Method
// PUT (explanation)
// if I send only one property in the req.body my expectaction is that all of the other properties will be removed from that item
// we just have to make one change in our controller but mongoose by default does not do that and we need to tell it to overwrite the resource in the options like the following:
const editTask = async (req, res) => {
  try {
    // grab the id parameter from the URL
    const { id: taskId } = req.params

    // search for task
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true, // will return the new item that was updated
      runValidators: true, // no explanation needed as this is obvious as to what it does
      // WE ADD IT HERE!
      overwrite: true, // tell Mongoose to overwrite the properties (because we are using the PUT method)
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

* So, as a reminder, we just add the following to overwrite
```
overwrite: true,
```

## Try it out
* If you try it you with just a name like:

`PUT {{URL}}/tasks/621413615cfb1b9270e560f6`

```
{
    "name": "joe"
}
```

* You will surprisingly get this in Postman:
* (This is because you have a default value set - let's temporarily unset it)
```
{
    "task": {
        "_id": "621413615cfb1b9270e560f6",
        "name": "joe",
        "completed": false
    }
}
```

* Unset default value

`models/Task.js`

```
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    // BELOW WE TURN OFF DEFAULT
    // default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
```

* Then try again with just name property

```
{
    "name": "joe"
}
```

* And that will give you this:

```
{
    "task": {
        "_id": "621413615cfb1b9270e560f6",
        "name": "joe"
    }
}
```

* So you see all properties (except `_id`) were replaced and that is how `PUT` works differently than `PATCH`


