# Implement Dynamic approach
* Rarely do we send our responses based on hard coded filter values

## query params
* This is how we get our data
* [https://hn.algolia.com/api](https://hn.algolia.com/api)
* And we can search for some data like this:

`GET http://hn.algolia.com/api/v1/search?query=...`

* After the `?` we have key/value pairs separated by `&` (these keys are query string parameters - (IMPORTANT to remember the `&`))

## How can we send these query parameters from postman?
* We have two options:
  * In the URL like this: `{{URL}}/products?name=john&featured=true` (you will see they are added in Postman table at same time)
  * That is the second option, add them in the Postman `Query Params` section
    * **tip** A nice feature is you can check and uncheck to make them active or inactive
    * **tip** In our `controller` we should have access to the query parameters via `req.query`

```
const getAllProducts = async (req, res) => {
  console.log(req.query)
  res.status(200).json({ msg: 'products route' })
}
```
* You will see the following in your terminal:

```
{ name: 'john', featured: 'true' }
```

## Now pass in query to our model via Mongoose `find()` method
* We just search for `featured: true`

`{{URL}}/products?name=john&featured=true`

```
const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query)
  res.status(200).json({ products, nbHits: products.length })
}
```

* And we see we only get 7 records returned so we no the query parameter worked

## Gotcha
* Add a parameter that is not in our data
 
`{{URL}}/products?name=john&page=2`

## We pluck off what we want and put it into a new object
* we check the values and update our new object
* if nothing is found then we pass an empty object to find which will find all
* if we pass a field with a value that our select is specifically looking for that data (this helps avoid the gothcha - TODO my fields that did not exist were still returning all records - I'm thinking it is how find() works but need to dig deeper)

```
const getAllProducts = async (req, res) => {
  // destructure parameters you want to check for
  const { featured } = req.query
  // good practice to create a new object for your query
  const queryObject = {}

  // if feature exists
  if (featured) {
    // if the query string value of 'true' then set new object featured to true
    // otherwise set it to false
    queryObject.featured = featured === 'true' ? true : false
  }
  // log it out to see what it looks like
  console.log(queryObject)

  // pass in our new queryObject
  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}
```

## Finished file
* We now can search for name, company and featured

```
const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  // docs -  https://www.npmjs.com/package/express-async-errors
  // throw new Error('testing async errors')
  const products = await Product.find({ name: 'one' })
  res.status(200).json({ products, nbHits: products.length })
}

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
    queryObject.name = name
  }
  // log it out to see what it looks like
  console.log(queryObject)

  // pass in our new queryObject
  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}
```
