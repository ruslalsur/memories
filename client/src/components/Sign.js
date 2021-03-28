import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import signin from '../assets/images/signin.jpg'
import signup from '../assets/images/signup.jpg'
import { teal } from '@material-ui/core/colors'
import { pink } from '@material-ui/core/colors'
import HomeIcon from '@material-ui/icons/Home'
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
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    overflowX: 'hidden',
  },
  leftSide: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 1,
    left: 1,
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

  const [form, setForm] = useState({
    username: '',
    password: '',
    repassword: '',
  })
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    setErrors(null)
    setForm({ ...form, password: '', repassword: '' })
  }, [props.signup])

  const validate = () => {
    let errorMsg = {
      username: [],
      password: [],
      repassword: [],
    }

    if (!form.username) errorMsg.username.push('не может быть пустым')
    if (form.username.length < 3) errorMsg.username.push('не менее 3 символов')

    if (!form.password) errorMsg.password.push('не может быть пустым')
    if (form.password.length < 3) errorMsg.password.push('не менее 3 символов')

    if (props.signup) {
      if (!form.repassword) errorMsg.repassword.push('не может быть пустым')
      if (form.repassword.length < 3)
        errorMsg.repassword.push('не менее 3 символов')
      if (form.password !== form.repassword) {
        errorMsg.password.push('пароли не совпадают')
        errorMsg.repassword.push('пароли не совпадают')
      }
    }

    if (Object.values(errorMsg).every((item) => item.length === 0)) {
      setErrors(null)
      return true
    } else {
      setErrors(errorMsg)
      return false
    }
  }

  const HandleFormDataChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSign = () => {
    if (validate()) {
      const url = props?.signup ? `/api/user/signup` : `/api/user/signin`
      axios
        .post(url, { form })
        .then((response) => console.log(`LOG response.data: `, response.data))
        .catch((err) => console.log(`Ошибка: `, err))
    }
  }

  return (
    <Grid container className={classes.root}>
      <Hidden only='xs'>
        <Grid item xs={12} sm={7}>
          <Box
            className={classes.leftSide}
            style={{
              color: props?.signup ? pink[500] : teal[500],
              background: `url(${
                props?.signup ? signup : signin
              }) center/cover no-repeat`,
            }}
          >
            <Box className={classes.backBtn}>
              <IconButton onClick={() => history.push('/')} aria-label='back'>
                <HomeIcon />
              </IconButton>
            </Box>
            <Typography className={classes.greeting} variant='h5'>
              {props?.signup ? 'Создайте учетную запись' : 'Добро пожаловать'}
            </Typography>
          </Box>
        </Grid>
      </Hidden>

      <Grid item xs={12} sm={5}>
        <Grid
          container
          spacing={5}
          direction='column'
          justify='space-around'
          alignItems='center'
          wrap='nowrap'
          className={classes.rightSide}
        >
          <Grid item>
            <ButtonGroup
              variant='text'
              color='primary'
              aria-label='text primary button group'
            >
              <Button onClick={() => history.push('/signin')}>
                <Typography
                  style={{
                    color: teal[600],
                    boxShadow: !props?.signup && `0 1px 0px ${teal[600]}`,
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
                    boxShadow: props?.signup && `0 1px 0px ${pink[600]}`,
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
                  autoFocus
                  error={!!errors?.username.length}
                  helperText={
                    !!errors?.username.length
                      ? errors?.username.join(' и ')
                      : ''
                  }
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
                  error={!!errors?.password.length}
                  helperText={
                    !!errors?.password.length
                      ? errors?.password.join(' и ')
                      : ''
                  }
                  value={form.password}
                  onChange={HandleFormDataChange}
                  name='password'
                  label='Пароль'
                  type='password'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              {props?.signup && (
                <Grid item>
                  <TextField
                    error={!!errors?.repassword.length}
                    helperText={
                      !!errors?.repassword.length
                        ? errors?.repassword.join(' и ')
                        : ''
                    }
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
            {props?.signup ? (
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
