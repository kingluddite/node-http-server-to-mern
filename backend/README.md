# Sort
* **note** does not affect the amount of items we return, just the order in which they are displayed
* This is using `mongoose` method not native mongodb db

## How to sort based on name? (a-z)
`{{URL}}/api/v1/products?sort=name`

* The product names will now be in alphabetical order

## Reverse in opposite order (z-a)
`{{URL}}/api/v1/products?sort=-name`

## Sort by multiple fields
`{{URL}}/api/v1/products?sort=-name,price`

## Documentation
* [Under general queries](https://mongoosejs.com/docs/api/query.html#query_Query-sort)
### Chaining them
* Order is important
* do after find().limit(10).sort({ occupation: -1}).select({name: 1}).exec(callback)

## Static approach for sort
```
const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name')
  res.status(200).json({ products, nbHits: products.length })
}
```

* That will sort by name in the response in reverse order

### Sort by two fields
* Just separate by space

```
const products = await Product.find({}).sort('-name price')
```

### Biggest gotcha - chaining properly
* implement basic sort in getAllProducts
* We will have to destructure `sort` our of the query - the gotcha is we are awaiting for `await Product.find()` to complete but when we use `find()` we get back a queryObject but in order to sort we need to chain this (we first go with find() and then need to chain it right after `find()` - `find().sort()`) - but the gotcha is the user might not be passing the `sort()` so we need to do this conditionally

```
const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured, company, name, sort } = req.query
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
    console.log(sort)
  }
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}
```

* And in Postman add a `sort` key with a `value` of `name` (it will log out `name` in the terminal)
* **gotcha** If you add multiple sorts with a space you will have a problem `-name,price` (entering that in Postman) will give you one long string but in order to sort you need a space between what fields you are sorting - so we need a little bit of JavaScript to fix this for us

```
  if (sort) {
    const sortList = sort.split(',').join(' ')
    console.log(sortList)
  }
```

* That will give you a sort in the format you need `name -price`

### Here is the code
```
  let result = Product.find(queryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}
```


