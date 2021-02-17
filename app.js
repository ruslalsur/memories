const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const { MONGO_URI, BUILD_PATH } = require('./config.js')

const app = express()

app.use(express.json())
app.use('/api/user', require('./routes/userRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(BUILD_PATH))
  app.use('*', (req, res) => res.sendFile(path.join(BUILD_PATH, 'index.html')))
}

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    const listener = app.listen(process.env.PORT, () =>
      console.log(
        `\nСлушаю ${listener.address().address}:${
          String(process.env.PORT).yellow
        }\nСоединение с базой данных установлено.\n${
          process.env.NODE_ENV === 'production' ? '' : 'Режим разработки'.yellow
        }\n`
      )
    )
  } catch (e) {
    console.log(`Ошибка: `, e.message)
    process.exit(1)
  }
}

start()
