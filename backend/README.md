# Mongoose
* Place pwd and database name (you can use default or put your own - I will make my own)

* connect.js has hardcoded user, pwd and db name in string to Atlas

## Problem with connecting to Database and Express not in sync
* our server and db don't work in sync
* currently our server is first listening on port 3000 and only then are we connecting to our database
* but think about it, why do we need our server if we are not connected to the Database - because whatever we are about to do will fail anyway without our Database - it would make more sense is to first try to connect to our Database server and only if we are successful then we spin up the express server and if we can't connect to our Database then we'll just kill the app

### Restructure code
* We won't invoke mongoose.connect()
* We'll refactor the code and set it up as a function and invoke it the server.js

### Unneeded code
* Options no longer needed in version 6 of Mongoose
```
return mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
```

## dotenv
* Do in root
* Create `.env` in root of app
* Do not need to use quotation marks

`/.env`
```
MONGO_URI=mongodb+srv://taskinator:0mjfeogKEz6XMTDpX@nodeexpresstasks.f03n6.mongodb.net/TASK_MANAGER_DB?retryWrites=true&w=majority
```

## .gitignore
```
node_modules
.DS_Store
```
