const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));
app.use('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

app.listen(5000, () => {console.log(`Сервер запущен!`)})
