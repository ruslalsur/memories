const path = require('path')

module.exports = {
  mongoUri:
    'mongodb+srv://rusla:0o9i8u7y@cluster0.c4yxa.mongodb.net/memories?retryWrites=true&w=majority',
  port: process.env.PROD ? 8000 : 5000,
  frontBuildPath: path.join(__dirname, 'client', 'build'),
  jwtSecret: 'R604658ANsfD78OM',
}
