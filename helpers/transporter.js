const nodemailer = require('nodemailer')
const { mailPass, mailUser } = require('config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailUser,
    pass: mailPass,
  },
})

module.exports = transporter
