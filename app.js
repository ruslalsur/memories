const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const {port, frontBuildPath, mongoUri} = require('./config.js')

const app = express()

app.use(express.json())
app.use('/api/user', require('./routes/userRoutes'))

if (process.env.PROD) {
  app.use(
    '/',
    express.static(frontBuildPath)
  )
  app.use('*', (req, res) =>
    res.sendFile(path.join(frontBuildPath, 'index.html'))
  )
}

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    app.listen(port, () =>
      console.log(
        `\nСлушаю Вас по адресу http://localhost:${
          String(port).yellow
        }\nСоединение с базой данных установлено.\nРежим разработки ${
          !process.env.PROD ? 'включен'.green : 'отключен'.blue
        }.\n`
      )
    )
  } catch (e) {
    console.log(`Ошибка: `, e.message)
    process.exit(1)
  }
}

start()
