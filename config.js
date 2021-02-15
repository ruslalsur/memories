const path = require('path')

module.exports = {
  MONGO_URI:
    'mongodb+srv://rusla:0o9i8u7y@cluster0.c4yxa.mongodb.net/memories?retryWrites=true&w=majority',
  BUILD_PATH: path.join(__dirname, 'client', 'build'),
  JWT_SECRET: 'R604658ANsfD78OM',
}
