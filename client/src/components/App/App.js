import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Main } from '../Main'
import { SignIn } from '../SignIn'
import { SignUp } from '../SignUp'
import { Header } from '../Header'
import { APP_NAME } from '../../config.js'
import './app.css'

export const App = () => {
  useEffect(() => {
    document.title = APP_NAME
  })

  return (
    <Router>
      <Header appName={APP_NAME} />
      <Container maxWidth='md' className='container'>
        <Grid
          container
          spacing={0}
          direction='row'
          justify='center'
          alignItems='center'
          alignContent='center'
          wrap='nowrap'
        >
          <Switch>
            <Route path='/' exact>
              <Main />
            </Route>
            <Route path='/auth'>
              <SignIn />
            </Route>
            <Route path='/reg'>
              <SignUp />
            </Route>
          </Switch>
        </Grid>
      </Container>
    </Router>
  )
}
