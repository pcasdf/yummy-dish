const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const db = require('./db/connections')
const usersRoutes = require('./routes/users')

const PORT = process.env.PORT || 5000

const app = express()

app.use(logger('dev'))

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {

  res.send('This is Root Route')
})

app.use('/api/users', usersRoutes)

db.on('error', console.error.bind(console, 'MongoDB connection error'))
app.listen(PORT)