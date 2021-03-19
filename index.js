const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const appMode = process.env.NODE_ENV
const { port, mongoUri } = require('config')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/memory', require('./routes/memoryRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.use('*', (req, res) =>
    res.sendFile(
      path.join(path.join(__dirname, 'client', 'build'), 'index.html')
    )
  )
}

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    app.listen(port, () => console.log(`PORT = ${port}\nMODE = ${appMode}`))
  } catch (e) {
    console.log(`Ошибка: `, e.message)
    process.exit(1)
  }
}

start()
