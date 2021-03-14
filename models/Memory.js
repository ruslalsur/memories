const { Schema, model } = require('mongoose')

const Memory = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, default: 'Пока описаниие отсутствует' },
  imgName: { type: String, default: 'noimage1.png' },
  shared: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
})

Memory.plugin(require('mongoose-autopopulate'))
module.exports = model('Memory', Memory)
