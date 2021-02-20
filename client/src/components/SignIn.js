import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'

export const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const onChangeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(`form: `, form)
  }

  const classes = {
    avatar: {
      background: '#4E55AC',
      marginTop: '1rem',
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
    <Grid container justify='center'>
      <Grid item xs={7} sm={5} md={3} lg={3} xl={3}>
        <Card>
          <CardContent>
            <Grid
              item
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
                  <Link to='/reg' style={classes.link}>
                    Регистрация
                  </Link>
                </Button>

                <Button color='primary'>Войти</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
