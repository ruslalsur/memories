const User = require('../models/User')

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.find()
      return res.status(200).json(users)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new UserController()
