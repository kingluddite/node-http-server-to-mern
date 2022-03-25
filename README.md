## Delete a record
```
const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

## Postman
* Grab an id of a task using getAllTasks request
* Update the request by appending the id you copied to the clipboard and make it look similar to this:

`{{URL}}/tasks/621456cdec46b85c5ae3a4e8`

* And it will output this postman

```
{
    "task": {
        "_id": "621456cdec46b85c5ae3a4e8",
        "name": "testing task",
        "completed": false,
        "__v": 0
    }
}
```

* If you change 1 character in id in request you will get the 404 error 
  
  
```
{
    "msg": "No task with id : 621456cdec46b85c5ae3a4e9"
}
```

* If you change the length of the id you will get the CastError because it knows it isn't a valid `_id`
* This is the error we see in postman (this is coming from the `catch` block):

```
{
    "msg": {
        "stringValue": "\"6\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "6",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"6\" (type string) at path \"_id\" for model \"Task\""
    }
}
```

## Better status
* We don't need to send the task back in the response, we just need to know we get a 200 success so here are the other commonly used responses

`res.status(200).send()` - that will send the 200 with no other information in the response


`res.status(200).json({ task: null, status: 'success' })` and this send back a good message letting you know all is well and this is a similar response you will see in postman:

```
{
    "task": null,
    "status": "success"
}
```

