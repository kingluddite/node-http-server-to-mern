# Actually Seed data
## Two things we need to accomplish
1. We need to remove all the products that are currently in our Database
2. Use the mongoose `create` and pass in the JSON products

## We used create in `controllers/tasks.js`
* We passed `Task.create()` and object when we were creating that task
* Since arrays are an object we can also pass in an array
  * Our products.json is an array of objects

```
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})
```

## Update our populate
* We delete existing data and add new records

`populate.json`

```
// we need to access our environment variables
require('dotenv').config()

// we need to connect again to our Database
const connectDB = require('./db/connect')
// grab our model
const Product = require('./models/product')

// grab our JSON file with data
const jsonProducts = require('./products.json')

// we don't need to listen but just connect to the Database and use the model to automatically add our JSON data
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // clean data by emptying it first
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log('Successfully connected to populate.js')
  } catch (error) {
    console.log(error)
  }
}

start()
```

## Also add tasks
* Generated JSON task data quickly using mockaroo - https://www.mockaroo.com/
* Update populate to create that data after existing data - note I am pushing this into the TASK_MANANGER_DB
