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
