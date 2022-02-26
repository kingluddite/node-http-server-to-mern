# Add Async Wrappers for all our controllers

## Why?
* All the try/catch blocks are redundant
* Let's make our code more DRY

## There should be a better solution
* There is and it is to set up a middleware function that will wrap our controllers

## There are npm 3rd party packages that do this
* We will hand code this

`middlewares/async.js`

```
// call it fn or callback or cb - your choice
// I'm doing this to avoid having to write a bunch of try/catch blocks but still have their functionality
// to do this we set up the try/catch blocks inside of the wrapper
const asyncWrapper = (fn) => {
  // the first thing we want to do from this function is return another one
  // remember in express by default right way we got access to request(req),response(res),and next
  // And since we wrap our controller in my middleware
  // and you will see below we are actually invoking the async() wrapper right away and now we want to pass in req, res, next (so we can access it inside our function and then down to our controller)
  // we are using await inside the function body so that is why we set it up as async
  // VERY IMPORTANT TO REMEMBER SO I WILL REPEAT MYSELF - below req,res,next we'll have access to right away because at the end of the day we return another function from asyncWrapper and then inside of the function body we pass req, res and next from Express down to this function body
  // and then in the function body we'll decide what to do with our parameter with our argument which is our current controller
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper

```

* Now we convert our controller from this:

```
const getAllTasks = asyncWrapper(async (req, res) => {
  try {
    const tasks = await Task.find({})
    // we send back the object
    // inside the object there is a property by the name of "tasks"
    // res.status(200).json({ tasks: tasks })
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})
```

* To this:

```
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})
```

* We did not deal with the errors yet but let's walk through what just happened:

### Recap
* We are waiting to find all the tasks and if we are successful we send back those tasks
* As far as our asyncWrapper - we take our controller as an argument `fn` and since we return a function we have access to req, res, next that are coming from Express, then we set up the try/catch block and in here we use `await` because our controller is still `async` and we know that by default an `async` function will ALWAYS return a Promise - so we are awaiting for the promise to be settles (either resolved or rejected) and since we have access to req, res, next I pass it down to my controller and then if there is an error, (whether in getAllTasks or any controller) then we catch it and pass it to the next() function (we haven't defined this next set of middleware yet)

### Now just apply the same asyncWrapper to all the other controllers
* Make sure to test routes in Insomnia to make sure it works the same as before the changes
* I created a task and it worked
* I created a task with an empty string and I received an error (but we are working on errors next)
