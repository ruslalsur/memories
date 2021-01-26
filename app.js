const express = require('express');
const path = require('path');
const conf = require('./config.js');

const app = express();

if (process.env.PROD) {
  app.use('/', express.static(path.join(__dirname, 'client', conf.dirNameToServ)));
  app.use('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(conf.port, () =>
  console.log(
    `Слушаю Вас на ${
      conf.port
    } порту. С уважением, Ваш сервер.\nРежим разработки: ${
      !process.env.PROD ? 'Включен' : 'Выключен'
    }`
  )
);
