const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  // docs -  https://www.npmjs.com/package/express-async-errors
  // throw new Error('testing async errors')
  const products = await Product.find({ featured: true })
  res.status(200).json({ products })
}

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}
