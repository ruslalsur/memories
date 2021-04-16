const { Schema, model } = require('mongoose')

const Memory = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  imgName: { type: String, default: '' },
  shared: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
  date: {
    type: Date,
    default: Date.now(),
  },
})

Memory.plugin(require('mongoose-autopopulate'))
module.exports = model('Memory', Memory)
