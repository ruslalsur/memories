import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { MemoriesPage } from './pages/MemoriesPage'
import { Sign } from './components/Sign'
import { Layout } from './components/Layout'
import { Box } from '@material-ui/core'

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
          <Box height='100vh'>
            <Sign signup />
          </Box>
        </Route>
        <Route path='/signin'>
          <Box height='100vh'>
            <Sign />
          </Box>
        </Route>
      </Switch>
    </Router>
  )
}
