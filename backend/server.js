// sample http server from docs: https://nodejs.org/api/synopsis.html
const http = require('http')
const fs = require('fs')
const HOSTNAME = '127.0.0.1'
const PORT = 3000

const server = http.createServer((req, res) => {
  let filePath = __dirname + '/public/index.html'

  console.log(req.url)

  switch (req.url) {
    case '/aboutus':
      filePath = __dirname + '/public/about.html'
      break
    case '/contactus':
      filePath = __dirname + '/public/contact.html'
      break
    default:
      filePath = __dirname + '/public/index.html'
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end('page not found', 'utf8')
    }
    res.statusCode = 200 // ok
    res.setHeader('Content-Type', 'text/html')
    res.end(data, 'utf8')
  })
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}/${PORT}`)
})
