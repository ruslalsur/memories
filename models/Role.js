const { Schema, model } = require('mongoose')

const Role = new Schema({
  role: { type: String, unique: true, default: 'USER' },
  description: { type: String, default: 'Пользователь' },
})

module.exports = model('Role', Role)
