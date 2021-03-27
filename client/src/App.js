import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { MemoriesPage } from './pages/MemoriesPage'
import { Sign } from './components/Sign'
import { SignUp } from './components/SignUp'
import { Layout } from './components/Layout'

export const App = () => {
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
        <Route path='/signup'>
          <Layout>
            <Sign signup />
          </Layout>
        </Route>
        <Route path='/signin'>
          <Layout>
            <Sign />
          </Layout>
        </Route>
      </Switch>
    </Router>
  )
}
