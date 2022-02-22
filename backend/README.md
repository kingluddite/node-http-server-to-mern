# CRUD in API
* With every model we have access to all these methods
* A query has a `.then()` and can be used as a promise and we can use async/await
* **note** Mongoose queries are not promises - They have a `.then()` function for `co` and `async/await` as a convenience. However, unlike promises, calling a query's `.then()` can execute the query multiple times.

## find()
* [find() docs](https://mongoosejs.com/docs/api.html#model_Model.find)
* Find all with find({})
## Resources
* [Mongoose query docs](https://mongoosejs.com/docs/queries.html)
* CRUD - https://coursework.vschool.io/mongoose-crud/
* 
