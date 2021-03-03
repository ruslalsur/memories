import React, { useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { MemoriesPage } from '../pages/MemoriesPage'
import { SignIn } from '../components/SignIn'
import { SignUp } from '../components/SignUp'
import { Layout } from '../components/Layout'
import { APP_NAME } from '../config.js'

import './app.css'

export const App = () => {
  useEffect(() => {
    document.title = APP_NAME
  }, [])

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Layout>
            <MainPage />
          </Layout>
        </Route>
        <Route path='/memories/:userId' exact>
          <Layout>
            <MemoriesPage />
          </Layout>
        </Route>
        <Route path='/auth'>
          <Layout>
            <SignIn />
          </Layout>
        </Route>
        <Route path='/reg'>
          <Layout>
            <SignUp />
          </Layout>
        </Route>
      </Switch>
    </Router>
  )
}
