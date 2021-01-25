const express = require('express');
const path = require('path');
const PORT = require('./config.js').port;
const isProduction = Boolean(process.env.PROD);
const port = isProduction ? 8088 : PORT;

const app = express();

if (isProduction) {
  app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));
  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(port, () =>
  console.log(`Слушаю Вас на ${port} порту. С уважением, Ваш сервер.\nРежим разработки: ${isProduction ? 'Нет' : 'Да'}`)
);
