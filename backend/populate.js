// we need to access our environment variables
require('dotenv').config()

// we need to connect again to our Database
const connectDB = require('./db/connect')
// grab our model
// const Product = require('./models/Product')
const Task = require('./models/Task')

// grab our JSON file with data
const jsonProducts = require('./products.json')
const jsonTasks = require('./tasks.json')

// we don't need to listen but just connect to the Database and use the model to automatically add our JSON data
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // await Product.deleteMany()
    await Task.deleteMany()
    await Task.create(jsonTasks)
    console.log('Successfully connected to populate.js')
    // stop node process with no errors (0)
    process.exit(0)
  } catch (error) {
    console.log(error)
    // stop node process with errors (1)
    process.exit(1)
  }
}

start()
