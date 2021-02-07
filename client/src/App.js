import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { AuthPage } from './pages/AuthPage'
import { RegPage } from './pages/RegPage'
import { Header } from './components/Header'
import { APP_NAME } from './config.js'

function App() {
  useEffect(() => {
    document.title = APP_NAME
  })
  
  return (
    <Router>
      <Header appName={APP_NAME} />
      <Container maxWidth='md'>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/auth'>
            <AuthPage />
          </Route>
          <Route path='/reg'>
            <RegPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
