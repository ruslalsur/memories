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
import HowToRegIcon from '@material-ui/icons/HowToReg'

export const RegForm = () => {
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
              <HowToRegIcon />
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
  )
}
