# Express Server

## Contents

## Instructions
`$ npm run dev`

* That will run nodemon on this host `http://localhost:3000`
* That home route `/` serves a simple "Hello from a sitcom fan club"

## http://localhost:8000/api/sitcoms
* This route shows 3 sitcoms
* **recommended tool** In order to "prettify" JSON in the browser use a Chrome extension like [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)
* When we hit this endpoint we run `res.json(sitcoms)` and this takes our `sitcom` array of objects and sends this data and appending to the request object to the server as formatted at JSON. JSON is a common format for sending data in HTTP requests

## http://localhost:8000/api/sitcoms/night-court
* This route shows 1 specific sitcom
* We are using dynamic routes (That is the `:sitcom` in the route) and so whatever is added after `/api/sitcoms/` will be the sitcom name stored in the dynamic `:sitcom` (this of it like a variable) - we can access that dynamic parameter using the requests `req.params.sitcom`
* Since our fake data is just an array of objects we loop through it and if the `chosenSitcom` matches the routeName then we return that specific sitcom in JSON format as part of the request to the server

## /api/sitcoms POST
* POST routes can't be tested using the browser, like we did with our previous GET routes

### How can we test POST routes?
* Using a tool like Postman or Insomnia
* It will pull off the request body JSON sent via a tool like Insomnia. If you don't it will add via an array push an empty object but this will add a new sitcom as an object to the sitcom array of objects

```
{
	"routeName": "fotc",
	"name": "Flight of the Conchords",
	"genre": "comedy",
	"debut": "June 17, 2007",
	"finale": "March 22, 2009"
}

```
* We see a 200 server status code. Here is a list of [all server codes](https://httpstatuses.com/) 

## The Not found using "*"
* At the end of the routes listed we use the wildcard `*` to catch all other routes and return a 404 HTTP status code to let the user know the resource was not found and also send text of 'Not Found'
* **note** If you find the server hanging it is because you hit a route that never returns anything (if you try localhost:8000/api/sitcoms/hanging-request endpoint you will see the handing request and you need to cancel the request to stop the endless loop)

## Listening
* At the bottom of server.js we listen for our server and we know it is working because our terminal updates with a log informating us what port our server is listening on

## Resources 
* Use the `resources/insomnia-sitcom-http-requests-collection.json` file to import it into Insomnia that will make testing these endpoints very user friendly

### How to import a collection
1. Open Insomnia
2. Click Create button (top right)
3. Under Import from click "File"
4. Navigate to the file inside the resources folder and it will import all the HTTP requests to test

## TODO
* I want to add serving static assets like images and local JavaScript



## Next Branch: 

