const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 3003
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
}) 

module.exports = server
