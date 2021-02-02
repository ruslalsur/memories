import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Avatar,
} from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'

export const LoginForm = (props) => {
  const { regRoute } = props
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const onChangeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const classes = {
    paper: {
      minWidth: '20vw',
      minHeight: '50vh',
      marginTop: '4rem',
      padding: '3rem',
    },
    avatar: {
      background: '#4E55AC',
    },
    link: {
      textDecoration: 'none',
      color: 'red',
    },
    buttons: {
      marginTop: '1rem',
    },
  }

  return (
    <>
      <Paper elevation={4} style={classes.paper}>
        <Grid
          item
          sx={12}
          container
          spacing={5}
          direction='column'
          justify='center'
          alignItems='center'
          alignContent='center'
          wrap='nowrap'
        >
          <Grid item>
            <Avatar style={classes.avatar}>
              <LockOpenIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant='h5' color='primary'>
              Вход
            </Typography>
          </Grid>
          <Grid
            sx={12}
            item
            container
            spacing={2}
            direction='column'
            justify='center'
            alignContent='center'
            wrap='nowrap'
          >
            <Grid item>
              <TextField
                value={form.username}
                onChange={onChangeHandler}
                name='username'
                label='Логин'
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                value={form.password}
                onChange={onChangeHandler}
                name='password'
                label='Пароль'
                type='password'
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            direction='row'
            justify='space-between'
            wrap='nowrap'
            style={classes.buttons}
          >
            <Button color='secondary'>
              <Link to={regRoute} style={classes.link}>
                Регистрация
              </Link>
            </Button>

            <Button color='primary'>Войти</Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}