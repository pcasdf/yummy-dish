const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const PORT = process.env.PORT || 5000

const app = express()

app.use(logger('dev')) 

app.use(cors())

app.get('/', (req, res) => {

  res.send('This is Root Route')
})

app.listen(PORT)