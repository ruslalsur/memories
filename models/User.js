const { Schema, model } = require('mongoose')

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Неверный формат электронной почты',
    ],
  },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role', autopopulate: true }],
})

User.plugin(require('mongoose-autopopulate'))
module.exports = model('User', User)
