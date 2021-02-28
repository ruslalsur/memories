const { validationResult } = require('express-validator')

module.exports = () => {
  return (req, res, next) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: `Ошибки валидации: ${validationErrors.errors[0].msg}`,
        validationErrors,
      })
    }

    next()
  }
}
