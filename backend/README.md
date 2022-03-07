# Numeric Filters
* Provide an option for user based on the number condition
  * When price is > 30 (example)
* Lots of logic
* We will use `$gt` (greater than) and `$lt` (less than)

## Sort by prices greater than 30
 ```
// MORE CODE

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

// MORE CODE
```

## getAllProducts
* We are getting this [idea from this API](https://hn.algolia.com/api) - search for `numericFilters`

 ```
// MORE CODE

const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured, company, name, sort, fields, numericFilters } = req.query

// MORE CODE
```

* In Postmant `Get All Products` request

`numericFilters` with a value of `price>40,rating>=4`

* we can log them out to make sure they exist

```
const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured, company, name, sort, fields, numericFilters } = req.query
  // good practice to create a new object for your query
  const queryObject = {}

 // MORE CODE

  if (numericFilters) {
    console.log(numericFilters)
  }
  // log it out to see what it looks like
  console.log(queryObject)
  let result = Product.find(queryObject)
  
  if (sort) {
   
   // MORE CODE
 
  }

 // MORE CODE

  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}
```

* That will output in terminal `price>40,rating>=4` and an empty object for the queryObject (Because we didn't pass anything in)
* We will set up an operatorMap (we will map the user friendly logic operators to the ones that are understood by mongoose)

```
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
    console.log(filters)
  }
```
* Test it out and you will see with the query from above will output:

```
price-$gt-40,rating-$gte-4
```

* I then create an array with all fields that use number value (price and rating)

 ```
// MORE CODE

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

// MORE CODE
```

* Test again and you will see this in your terminal

```
{ price: { '$gt': 40 }, rating: { '$gte': 4 } }
```


