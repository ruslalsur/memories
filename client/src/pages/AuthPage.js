import React from 'react'
import { Grid } from '@material-ui/core'
import { LoginForm } from '../components/LoginForn'

export const AuthPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='row'
      justify='center'
      alignItems='center'
      alignContent='center'
      wrap='nowrap'
    >
      <LoginForm regRoute='/reg' />
    </Grid>
  )
}
