import React from 'react'
import { Grid } from '@material-ui/core'
import { LoginForm } from '../components/LoginForn'

export const AuthPage = () => {
  const classes = {
    wrapper: {
      marginTop: '4rem',
      padding: '2rem',
    },
  }

  return (
    <Grid
      style={classes.wrapper}
      container
      spacing={0}
      direction='row'
      justify='center'
      alignItems='center'
      alignContent='center'
      wrap='nowrap'
    >
      <LoginForm />
    </Grid>
  )
}
