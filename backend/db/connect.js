const mongoose = require('mongoose')
// note: v6 gets rid of all the deprecation warnings!
// if you didn't create db already they will create it for you
// renaming myFirstDatabase

const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
