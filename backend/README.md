%% https://www.youtube.com/watch?v=qwfE7fSVaZM&t=12866s
# Find only featured products
* Adding Filter functionality

`controllers/products.js`

```
const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  // docs -  https://www.npmjs.com/package/express-async-errors
  // throw new Error('testing async errors')
  const products = await Product.find({ featured: true })
  res.status(200).json({ products })
}
```

## Test
* In Postman search Get All Products request

## Number of hits - nbHits
* Send this where you are sending your response
* We can tell by this number if we are seeing all the products or just the featured products much easier - it will be added to the bottom of your Postman response

* Searching all products

![all products - nbHits 23](https://i.imgur.com/1NGHWJ4.png)
```
const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  // docs -  https://www.npmjs.com/package/express-async-errors
  // throw new Error('testing async errors')
  const products = await Product.find({})
  res.status(200).json({ products, nbHits: products.length })
}
```

* Search only featured products
 
![only featured products - 7](https://i.imgur.com/PoTEX4C.png)
```
const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  // docs -  https://www.npmjs.com/package/express-async-errors
  // throw new Error('testing async errors')
  const products = await Product.find({ featured: true })
  res.status(200).json({ products, nbHits: products.length })
}
```

## Just find one product by name
```

  // throw new Error('testing async errors')
  const products = await Product.find({ name: 'vase table' })
  res.status(200).json({ products, nbHits: products.length })
}
```

