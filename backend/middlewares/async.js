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
