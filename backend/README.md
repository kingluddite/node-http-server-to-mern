# Route Not Found 404

## View our app in browser
`http://localhost:3000/`


## View API list of tasks
`http://localhost:3000/api/v1/tasks`

## If you go to route not defined like:
`http://localhost:3000/api/v1/yo`

* You get this:

`Cannot GET /api/v1/yo`

* Check the network tab and you will see a status of 404
* This is the default 404

## Let's set up a custom 404
* Here is algolia's custom error - https://hn.algolia.com/api/v1/item

* **IMPORTANT** The location of the custom 404 is IMPORTANT

* We could add the 404 in the server.js file but we will add it inside a `middlewares` folder

`middlewares/not-found.js`

```
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound
```

### middleware or middlewares?
* **note** The noun middleware can be countable or uncountable. In more general, commonly used, contexts, the plural form will also be middleware. However, in more specific contexts, the plural form can also be middlewares e.g. in reference to various types of middlewares or a collection of middlewares

## Make sure to require our new middleware
`server.js`

```
// MORE CODE

const notFound = require('./middlewares/not-found')
// middleware
app.use(express.static('./public'))

 // MORE CODE

app.use('/api/v1/tasks', tasks)
app.use(notFound)

// MORE CODE
```

## Now visit the error not defined again
`http://localhost:3000/api/v1/yo`

* And you will see this:

`Route does not exist`

* Try it in Postman and you will see the same output
