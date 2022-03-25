# Add express-async-errors
* [express-async-error npm docs](https://www.npmjs.com/package/express-async-errors)
## Summary
* Easy to use
* Install it:

```
$ npm i express-async-errors
```

* Then the only thing you need to do is require it and you are good to go
* Long story short, instead of setting up try/catch and setting up our own middleware, we can just use a package, that does all the work for us so we can eat and have our cake too (we get the benefit of using async code and we don't need to worry about setting up try/catches or our own middleware )

## Why are we not using `next`?
* "As we all know express sends a function called next into the middleware, which then needs to be called with or without error to make it move the request handling to the next middleware. It still works, but in case of an async function, you don't need to do that. If you want to pass an error, just throw a normal exception:"



