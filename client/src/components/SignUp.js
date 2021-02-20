import React from 'react'
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

export const SignUp = () => {
  const classes = {
    avatar: {
      background: '#4E55AC',
      marginTop: '1rem',
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
                  <PersonAddIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant='h5' color='primary'>
                  Регистрация
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
                  <TextField id='login' label='Логин' fullWidth />
                </Grid>
                <Grid item>
                  <TextField
                    id='password'
                    label='Пароль'
                    type='password'
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id='repassword'
                    label='Повторить пароль'
                    type='password'
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid
                container
                item
                wrap='nowrap'
                justify='center'
                style={classes.buttons}
              >
                <Button color='secondary'>Зарегистрироваться</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
