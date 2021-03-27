import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import signin from '../assets/images/signin.jpg'
import signup from '../assets/images/signup.jpg'
import { teal } from '@material-ui/core/colors'
import { pink } from '@material-ui/core/colors'
import {
  Button,
  TextField,
  Typography,
  ButtonGroup,
  Grid,
  Box,
} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '97%',
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

  const [isSignUp, setIsSignUp] = useState(props.hasOwnProperty('signup'))
  const [form, setForm] = useState({
    username: '',
    password: '',
    repassword: '',
  })
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    setForm({ ...form, password: '', repassword: '' })
  }, [isSignUp])

  const HandleFormDataChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const HandleOnBlur = (event) => {
    setErrors(null)
    const name = event.target.name
    if (form.name === '')
      setErrors({ ...errors, [name]: 'поле не может быть пустым' })
    if (form[name].length < 3)
      setErrors({ ...errors, [name]: 'длинна должна быть не менее 3 символов' })
  }

  const handleSign = () => {
    const url = isSignUp ? `/api/user/signup` : `/api/user/signin`
    axios
      .post(url, { form })
      .then((response) => console.log(`LOG response.data: `, response.data))
      .catch((err) => console.log(`Ошибка: `, err))
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={6}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100%',
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

      <Grid item xs={12} md={6}>
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
              <Button onClick={() => setIsSignUp(false)}>
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
              <Button onClick={() => setIsSignUp(true)}>
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
          <Grid item style={{ width: '65%' }}>
            <Grid container spacing={7} direction='column' wrap='nowrap'>
              <Grid item>
                <TextField
                  error={false}
                  helperText={errors?.username.join('; ')}
                  value={form.username}
                  onChange={HandleFormDataChange}
                  onBlur={HandleOnBlur}
                  name='username'
                  label='Логин'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              {/* <Grid item>
                <TextField
                  error={errors.length}
                  helperText={errors.join('; ')}
                  value={form.password}
                  onChange={HandleFormDataChange}
                  onBlur={HandleOnBlur}
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
                    error={errors.length}
                    helperText={errors.join('; ')}
                    value={form.repassword}
                    onChange={HandleFormDataChange}
                    onBlur={HandleOnBlur}
                    name='repassword'
                    label='Повтор пароля'
                    type='password'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              )} */}
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.doneButton}>
            {isSignUp ? (
              <SignUpButton
                disabled={errors}
                variant='contained'
                onClick={() => handleSign}
              >
                Зарегистрироваться
              </SignUpButton>
            ) : (
              <SignInButton
                disabled={errors}
                variant='contained'
                onClick={() => handleSign}
              >
                Войти
              </SignInButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
