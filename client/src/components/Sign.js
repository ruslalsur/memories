import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import signin from '../assets/images/signin.jpg'
import signup from '../assets/images/signup.jpg'
import { teal } from '@material-ui/core/colors'
import { pink } from '@material-ui/core/colors'
import HomeIcon from '@material-ui/icons/Home'
import { Context } from '../context'
import {
  Button,
  IconButton,
  TextField,
  Typography,
  ButtonGroup,
  Grid,
  Box,
  Hidden,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    overflowX: 'hidden',
  },
  leftSide: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
  },
  rightSide: {
    minWidth: '100%',
    minHeight: '100%',
  },
  greeting: {
    marginTop: '5vw',
    fontFamily: 'Marck Script',
  },

  rightSide__input: {
    minWidth: '70%',
  },
  link: {
    textDecoration: 'none',
    color: 'red',
  },
  doneButton: {
    marginTop: '1rem',
  },
}))

export const Sign = (props) => {
  const classes = useStyles()
  let history = useHistory()
  const { login, setInfo } = useContext(Context)
  const isSignUp = props.hasOwnProperty('signup')

  const SignInButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(teal[500]),
      backgroundColor: teal[500],
      '&:hover': {
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[700],
      },
      '&:disabled': {
        color: teal[50],
        backgroundColor: teal[200],
      },
    },
  }))(Button)

  const SignUpButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
      '&:hover': {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[700],
      },
      '&:disabled': {
        color: pink[50],
        backgroundColor: pink[200],
      },
    },
  }))(Button)

  const init = {
    username: '',
    password: '',
    repassword: '',
  }

  const [form, setForm] = useState(init)
  const [errors, setErrors] = useState(init)

  useEffect(() => {
    setForm({ ...form, password: '', repassword: '' })
  }, [props.signup])

  useEffect(() => {}, [])

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
    const err = {
      username: rules.set1.rule.test(form.username) ? '' : rules.set1.msg,
      password: rules.set2.rule.test(form.password) ? '' : rules.set2.msg,
      repassword: isSignUp
        ? rules.set3.rule(form.password, form.repassword)
          ? ''
          : rules.set3.msg
        : '',
    }

    setErrors(err)
    return Object.values(err).every((item) => item === '')
  }

  const HandleFormDataChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSign = () => {
    if (validate(form)) {
      const url = isSignUp ? `/api/user/signup` : `/api/user/signin`
      axios
        .post(url, form)
        .then((response) => {
          if (isSignUp) {
            setInfo({ type: 'success', msg: response.data.message })
            history.push('/signin')
          } else {
            login(response.data.authorizedUser, response.data.token)

            history.push('/profile')
          }
        })
        .catch((err) => {
          console.log(`Ошибка регистрации/авторизации: `, err)
          setInfo({ type: 'error', msg: err.response?.data?.message })
        })
    }
  }

  return (
    <Grid container className={classes.root}>
      <Hidden only='xs'>
        <Grid item xs={12} sm={7}>
          <Box
            className={classes.leftSide}
            style={{
              color: isSignUp ? pink[500] : teal[500],
              background: `url(${
                isSignUp ? signup : signin
              }) center/cover no-repeat`,
            }}
          >
            <Typography className={classes.greeting} variant='h5'>
              {isSignUp ? 'Создайте учетную запись' : 'Добро пожаловать'}
            </Typography>
          </Box>
        </Grid>
      </Hidden>

      <Grid item xs={12} sm={5}>
        <Grid
          container
          spacing={5}
          direction='column'
          justify='space-between'
          alignItems='center'
          wrap='nowrap'
          className={classes.rightSide}
        >
          <Grid item>
            <Box display='flex' justifyContent='center' py={1}>
              <IconButton onClick={() => history.push('/')} aria-label='back'>
                <HomeIcon />
              </IconButton>
            </Box>
            <ButtonGroup
              variant='outlined'
              color='primary'
              aria-label='text primary button group'
            >
              <Button onClick={() => history.push('/signin')}>
                <Typography
                  style={{
                    color: teal[600],
                    boxShadow: !isSignUp && `0 1px 0px ${teal[600]}`,
                  }}
                  variant='button'
                  display='block'
                >
                  вход
                </Typography>
              </Button>

              <Button onClick={() => history.push('/signup')}>
                <Typography
                  style={{
                    color: pink[600],
                    boxShadow: isSignUp && `0 1px 0px ${pink[600]}`,
                  }}
                  variant='button'
                  display='block'
                >
                  регистрация
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item style={{ width: '90%' }}>
            <Grid container spacing={7} direction='column' wrap='nowrap'>
              <Grid item>
                <TextField
                  error={!!errors.username}
                  helperText={errors.username}
                  value={form.username}
                  onChange={HandleFormDataChange}
                  name='username'
                  label='Логин'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item>
                <TextField
                  error={!!errors.password}
                  helperText={errors.password}
                  value={form.password}
                  onChange={HandleFormDataChange}
                  name='password'
                  label='Пароль'
                  type='password'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              {isSignUp && (
                <Grid item>
                  <TextField
                    error={!!errors.repassword}
                    helperText={errors.repassword}
                    value={form.repassword}
                    onChange={HandleFormDataChange}
                    name='repassword'
                    label='Повтор пароля'
                    type='password'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.doneButton}>
            {isSignUp ? (
              <SignUpButton variant='contained' onClick={() => handleSign()}>
                Зарегистрироваться
              </SignUpButton>
            ) : (
              <SignInButton variant='contained' onClick={() => handleSign()}>
                Войти
              </SignInButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
