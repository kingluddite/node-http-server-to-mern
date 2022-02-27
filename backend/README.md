# Adding a product model
* This will have a createdAt field

`/models/Product.js`
* **TODO** Should model file names be capitalized or lowercase?

```
// MORE CODE

  createdAt: {
    type: Date,
    default: Date.now(),
  },

// MORE CODE
```

## Enum
* When you have a list of only available names use Enum
* Good example is admin, reader, user, editor
* You can also use it with validation

`/models/Product.js`

```
  company: {
    type: String,
    // basic
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    // set up custom error message
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      // custom error message
      // in order to access the value that the USER is providing (meaning the one that is coming in with the request)
      message: '{VALUE} is not supported', // this will access whatever the USER is providing
    },
```


