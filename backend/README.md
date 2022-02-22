# Errors
* In Get single task request add a bad id and send in postman and you will get the following error

```
{
    "msg": "No task with id : 621413d45cfb1b9270e560f1"
}
```

## But if you add less characters than a mongo id or more characters in a mongo id like this:


`{{URL}}/tasks/621bad`

* You will get this `CastError`

```
{
    "msg": {
        "stringValue": "\"621bad\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "621bad",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"621bad\" (type string) at path \"_id\" for model \"Task\""
    }
}
```
