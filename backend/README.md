# Add Database connection
* `db/connect.js`

```
const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
```

## Log in to mongodb
* You only get one db per email
* Connect > Conect to app > grab string and place into `.env`, make sure to add your password and rename you Database to what you are building

`.env`

```
MONGO_URI=mongodb+srv://theadmin:HaZvZhnR3w0AvCsD@devconnector.a2gjt.mongodb.net/JOBS-API-DB?retryWrites=true&w=majority
```

* Then add to app

```
 // MORE CODE

// connectDB
const connectDB = require('./db/connect') // ADD THIS

 // MORE CODE

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // ADD THIS
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
```

* Run app and should work just as it did before but now we are connect to the Database

## Add user model

```
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    maxlength: 12,
  },
})

module.exports = mongoose.model('User', UserSchema)
```


