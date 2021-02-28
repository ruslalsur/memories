import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { MemoriesPage } from '../pages/MemoriesPage'
import { MemoryPage } from '../pages/MemoryPage'
import { SignIn } from '../components/SignIn'
import { SignUp } from '../components/SignUp'
import { Header } from '../components/Header'
import { APP_NAME } from '../config.js'
import './app.css'

export const App = () => {
  useEffect(() => {
    document.title = APP_NAME
  })

  return (
    <Router>
      <Header appName={APP_NAME} />
      <Container className='container' maxWidth='lg'>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/memories/:id'>
            <MemoriesPage />
          </Route>
          <Route path='/memory/:id'>
            <MemoryPage />
          </Route>
          <Route path='/auth'>
            <SignIn />
          </Route>
          <Route path='/reg'>
            <SignUp />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}
