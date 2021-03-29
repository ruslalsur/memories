import { useState } from 'react'

export const useValidate = () => {
  const [errors, setErrors] = useState({})

  const rules = {
    set1: {
      rule: /^[a-z0-9_-]{3,16}$/,
      msg: 'от 3 до 16 латинских букв/цифр в нижнем регистре',
    },
    set2: {
      rule: /^[A-Za-z0-9_-]{3,8}$/,
      msg: 'от 3 до 8 латинских букв/цифр',
    },
    set3: {
      rule: (pass1, pass2) => pass1 === pass2,
      msg: 'пароли не совпадают',
    },
  }

  const validate = (form) => {
    setErrors({})
    setErrors({
      username: rules.set1.rule.test(form.username) ? '' : rules.set1.msg,
      password: rules.set2.rule.test(form.password) ? '' : rules.set2.msg,
      repassword: rules.set3.rule(form.password, form.repassword)
        ? ''
        : rules.set3.msg,
    })
  }

  return { errors, setErrors, rules, validate }
}
