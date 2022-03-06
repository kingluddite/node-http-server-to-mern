# Limit query in mongoose (and skip)
* Limit 4 records
* If the limit is a number larger than all your items you just get all your items

```
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('price name').limit(4)
  res.status(200).json({ products, nbHits: products.length })
}
```

## Skip
* Works same way but skips the number of items

 ```
// MORE CODE

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(10)
    .skip('1')
  res.status(200).json({ products, nbHits: products.length })
}

// MORE CODE
```

## We use limit and skip to set up pagination functionality
* we won't set up names in our `req.query` for `limit` and `skip` because we'll set up the variables with the same name
* Our page is a string and we need to turn it into a number (if they don't scroll to page then we set the page to `1` but default)
* We turn limit to a Number and default it to `10`

 ```
// MORE CODE

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

// MORE CODE
```


