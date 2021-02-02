module.exports = {
  mongoUri:
    'mongodb+srv://rusla:0o9i8u7y@cluster0.c4yxa.mongodb.net/memories?retryWrites=true&w=majority',
  port: process.env.PROD ? 80 : 5000,
  dirNameToServ: 'build',
  jwtSecret: 'RANDOM_KEY',
}
