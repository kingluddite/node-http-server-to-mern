const authenticationMiddleware = async (req, res, next) => {
  // remember to get to next middleware (in our case here a dashboard route, we need to use "next" function)
  console.log(req.headers.authorization)
  next()
}

module.exports = authenticationMiddleware
