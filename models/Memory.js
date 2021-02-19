const { Schema, model } = require('mongoose')

const Memory = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: 'Пока описаниие отсутствует' },
  image: { type: String, default: 'noimage.png' },
  shared: { type: Boolean, default: false },
  user: { type: String, ref: 'User' },
})

module.exports = model('Memory', Memory)
