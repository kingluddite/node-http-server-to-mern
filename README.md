# Select certain fields
* We tell it what fields we want to see in our query
* Remember the order here and where `select()` falls into the order in `mongoose`

```
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('price name')
  res.status(200).json({ products, nbHits: products.length })
}
```

* That just gets us `name` and `price` fields
* You are in charge of the names for your query string (you tell the user in the docs what to use to select certain fields)
* I add `select()` after `sort()` (but before `products`)
* Make sure to add your name `fields` in your query string

```
  const { featured, company, name, sort, fields } = req.query
```

* and the full method

```
const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured, company, name, sort, fields } = req.query
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
  // console.log(queryObject)
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
   
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}
```

* Now you can sort and get specific fields in Postman with a `fields` of `name,price` and `sort` with a value of `price`


