# Validating Models
* Now we add a try catch that doens't hang because we didn't handle our Promise rejection gracefully (remember we are using async/await)
* You will get an error not in the terminal and Postman won't stop or keep hanging but you will send and error as part of the response from the request

```
{
    "msg": {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "must provide name",
                "properties": {
                    "message": "must provide name",
                    "type": "required",
                    "path": "name"
                },
                "kind": "required",
                "path": "name"
            }
        },
        "_message": "Task validation failed",
        "name": "ValidationError",
        "message": "Task validation failed: name: must provide name"
    }
}
```

* We can simplify the try catch so it isn't in every api route but for now we will have it in every route
* We can also make the error much shorter (it is huge right now!)

