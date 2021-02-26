const { Schema, model } = require('mongoose')

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'noavatar.png' },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role', autopopulate: true }],
})

User.plugin(require('mongoose-autopopulate'))
module.exports = model('User', User)
