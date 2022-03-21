stopped at 6:19
# Improve our custom errors
* We have two types of custom errors:

1. Bad requests - 400 
2. One for authentication - 401

## There is a better approach
* We'll use the beauty of classes to extend the main custom error to handle each of our custom error situations

## We first remove the status code from our CustomAPIError class

```
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = CustomAPIError
```

* And make it

```
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
  }
}

module.exports = CustomAPIError
```

## Create new error files
* `/errors/unauthenticated.js`
* `/errors/bad-request.js`
* `/errors/index.js`


