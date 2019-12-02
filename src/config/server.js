const bodyParser = require('body-parser')
const express = require('express')
const cors = require('../config/cors')

const PORT = process.env.PORT || 3003
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
}) 

module.exports = server
