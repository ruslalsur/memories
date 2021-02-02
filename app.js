const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const conf = require('./config.js')

const app = express()

app.use(express.json())
app.use('/api/user', require('./routes/userRoutes'))

if (process.env.PROD) {
  app.use(
    '/',
    express.static(path.join(__dirname, 'client', conf.dirNameToServ))
  )
  app.use('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  )
}

const start = async () => {
  try {
    await mongoose.connect(conf.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    app.listen(conf.port, () =>
      console.log(
        `\nСлушаю Вас по адресу http://localhost:${
          String(conf.port).yellow
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
