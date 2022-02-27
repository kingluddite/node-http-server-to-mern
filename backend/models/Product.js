const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
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
  },
})

module.exports = mongoose.model('Product', productSchema)
