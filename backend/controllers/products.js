const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured, company, name, sort, fields, numericFilters } = req.query
  // good practice to create a new object for your query
  const queryObject = {}

  // if feature exists
  if (featured) {
    // if the query string value of 'true' then set new object featured to true
    // otherwise set it to false
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    // regex to find match and swap mongoose operator with user friendly operator
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )

    // add numeric options
    const options = ['price', 'rating']
    // we split on the commas in a string into an array
    // then we iterate over the array
    filters = filters.split(',').forEach((item) => {
      // in the callback funtion we'll have access to that item
      // now we'll split more into an array based on the dashes used to surround eatch operator match
      // price-$gt-40 (example)
      // field = price
      // operator = $gt
      // value = 40
      // we are using array destructuring where we can pull out the values
      const [field, operator, value] = item.split('-')

      // only if the field is in our options, then we will add a new property on that queryObject
      if (options.includes(field)) {
        // we dynamically set up the property (that's why we use the square brackets)
        // the value will be an object
        // inside we make our operator key dynamic (because this operator will change >,>=,= etc)
        // We use Number because we get this as a string and we need to convert it to a Number and then pass in the value
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }
  // log it out to see what it looks like
  console.log(queryObject)
  let result = Product.find(queryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}
