# Validating Models
* [Mongoose validation docs](https://mongoosejs.com/docs/validation.html)
* Set up properties as objects and then we can set up built-in validators

`models/Tasks.js`

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
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
```

## Problem
* We don't get a response because we error and the transaction doesn't happen but we need to handle this better
