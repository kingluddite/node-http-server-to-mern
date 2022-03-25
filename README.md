# Models
* MongoDB is the wild west
* you can do anything and this is a problem when you want to validate data to make sure it is in the form you want (this is easy in MySQL relational Database but how can we do this in NoSQL Database like MongoDB? Through an ODM like Mongoose)

## What is Mongoose ODM?
* Image result for odm mongoose
* Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
* It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB

## Mongoose Schema types
* [docs for mongoose schema types](https://mongoosejs.com/docs/schematypes.html)
### Mongoose Models
* In Mongoose a Model is a wrapper for the Schema, so if the Schema defines the structure for the Document (ie type, validations, etc), a Mongoose Model provides an interface to the Database so using the model will be able to CRUD our Documents with ease since the API is extremely straight forward
* Models are fancy contructors compiled from Schema definitions 
* An instance of a model is called a `document`
* [model docs](https://mongoosejs.com/docs/models.html)
* if you enter this in postman

```
{
    "name": "tasks",
    "completed": true
}
```

* You will get this output 201 Created
* The `_id` is a hint letting you know that id was created in MongoDB
* View in MongoDB and you will see two documents entered
* If you add in postman fields you did not add in schema, they will be ignored
```
{
    "task": {
        "name": "tasks",
        "completed": true,
        "_id": "621413615cfb1b9270e560f6",
        "__v": 0
    }
}
```

