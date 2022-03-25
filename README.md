# JWT Front end
1. View browser local storage and it is empty
2. Visit public login page `localhost:3000`
3. Entern username and password
4. Submit
5. View local storage and it now has a token
6. Then when you make the next request, by clicking the `data` button, view the network tab in chrome dev tools (CDTs), you grab the token in your code from local storage and you can see in your network request of dashboard 'Headers' section of CDTs You will see the Headers has an `Authorization: Bearer <and your token here>`

## Our front end code that makes this work
`public/assets/js/browser-app.js`

```
// MORE CODE

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  tokenDOM.classList.remove('text-success')

// MORE CODE
```

* We have a try/catch where we listen for the post of our form via this endpoint `/api/v1/login`
* We use the axios library (we could use the native `fetch()` if we want)
* We send our username and password inside an object
* We set it inside localStorage and give it the name `token` and set it in `data.token`
* On the frontend you'll store this token somewhere
* You will issue a GET request to grab the token from localStorage and in a try/catch you try to make a get request by hitting the endpoint and adding the token inside the request object as part of the request `headers` as Authorization using the `Bearer schema` by passing in the token with all requests that require access to private information (you will need to use headers with axios or fetch, or any other ajax library)

## Now GET request for Dashboard
* Using postman
* `{{URL}}/dashboard`
* Select `HEADERS` in Postman (having to copy and paste tokens all the time will be a huge pain - there is a better, faster way)
* Add `Authorization` field in PM with a value of `Bearer <enter your token>`
* And if you enter a `console.log(req.headers)` in the dashboard then in the terminal you will see logged is an `authorization: 'Bearer <your token>'` inside `headers` of the request
* We will soon send back the user that is tied to that token so we only access the specific resources that that user has access to

## Dashboard test
```
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // should error with 'Invalid Credentials'
    // should pass 400 and not 401
    // 400 is authentication error
    // 401 is bad request error
    // we'll use "no token provided" to make it easier to debug
    throw new CustomAPIError('No token provided', 401)
  }

  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}
```

`{{URL}}/dashboard`

Without Authorization you get an error (terminal shows no token provided error but I want postman to show it in the custom error **TODO**)
But if you add in PM authorization and `Bearer <enter your token>` you will get this successful message in PM

```
{
    "msg": "Hello, John Doe",
    "secret": "Here is your authorized data, your lucky number is 59"
}
```

## Now let's grab the Bearer token
* Use this code

```
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // should error with 'Invalid Credentials'
    // should pass 400 and not 401
    // 400 is authentication error
    // 401 is bad request error
    // we'll use "no token provided" to make it easier to debug
    throw new CustomAPIError('No token provided', 401)
  }

  // grab token
  const token = authHeader.split(' ')[1]
  console.log(token)

  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}
```

* you will now see the token in the terminal



