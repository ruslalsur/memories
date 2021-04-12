const nodemailer = require('nodemailer')
const { mailPass, mailUser } = require('config')

const mailSender = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  })

  const letter = {
    from: 'rugesuruge@gmail.com',
    to: user.email,
    subject: 'Воспоминания',
    html: `
  <h4>Здравствуйте, <span style="color: red;">${user.username}</span>!</h4>
  <h5> Cпасибо за предоставление дополнительной информации о себе.</h5>      
  `,
  }

  transporter.sendMail(letter, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = mailSender
