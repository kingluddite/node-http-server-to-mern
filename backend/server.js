const express = require('express')
// initialize express and invoke it
const app = express()

const port = 3000

// home route
app.get('/', (req, res) => {
  res.send('home page')
})

app.listen(port, console.log(`server is listening on port ${port}`))
