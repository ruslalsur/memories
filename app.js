const express = require('express');
const path = require('path');
const isProduction = Boolean(process.env.PROD);
const PORT = isProduction ? 80 : 5000;

const app = express();



if (isProduction) {
  app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));
  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () =>
  console.log(`Сервер запущен на ${PORT} порту!\nProduction: ${isProduction}`)
);
