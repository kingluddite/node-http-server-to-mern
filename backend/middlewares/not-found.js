// we will still have access to `req` and `res`
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound
