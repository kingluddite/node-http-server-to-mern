# MongoDB Regex
* [mongodb regex docs](https://docs.mongodb.com/manual/reference/operator/query/regex/)
## Get all items where there is at least an `a`
* Pass `$regex` and `i` for case insensative 

```
const getAllProductsStatic = async (req, res) => {
  // docs -  https://www.npmjs.com/package/express-async-errors
  // throw new Error('testing async errors')
  const search = 'a'
  const products = await Product.find({ $regex: search, $options: 'i' })
  res.status(200).json({ products, nbHits: products.length })
}
```

* Find no featured, ikea company with a name that has `e`

```
const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured, company, name } = req.query
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
  // log it out to see what it looks like
  console.log(queryObject)

  // pass in our new queryObject
  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}
```



