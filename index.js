const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const colors = require('colors')
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

    app.listen(30550 || 30003, () =>
      console.log(
        `\nСлушаю на ${String(port).yellow} порту\nВ режиме ${
          String(process.env.NODE_ENV).yellow
        }\n`
      )
    )
  } catch (e) {
    console.log(`Ошибка: `, e.message)
    process.exit(1)
  }
}

start()
