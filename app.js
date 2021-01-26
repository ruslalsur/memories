const express = require('express');
const path = require('path');
const config = require('./config.js');

const app = express();

if (process.env.PROD) {
  app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));
  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(config.port, () =>
  console.log(
    `Слушаю Вас на ${
      config.port
    } порту. С уважением, Ваш сервер.\nРежим разработки: ${
      !process.env.PROD ? 'Включен' : 'Выключен'
    }`
  )
);
