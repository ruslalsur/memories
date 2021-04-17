import React, { useState, useEffect, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { MemoriesPage } from './pages/MemoriesPage'
import { ProfilePage } from './pages/ProfilePage'
import { Sign } from './components/Sign'
import { Layout } from './components/Layout'
import { LOCALSTORAGE_NAME } from './config.js'
import { Context } from './context'

export const App = () => {
  const [info, setInfo] = useState(null)
  const [authorizedUser, setAuthorizedUser] = useState(null)
  const [token, setToken] = useState(null)
  const [search, setSearch] = useState('')

  const login = useCallback((authUser = null, authToken = null) => {
    if (authUser && authToken) {
      localStorage.setItem(
        LOCALSTORAGE_NAME,
        JSON.stringify({
          authorizedUser: authUser,
          token: authToken,
        })
      )

      setAuthorizedUser(authUser)
      setToken(authToken)
    } else {
      const storedAuthorizedData = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_NAME)
      )
      setAuthorizedUser(
        storedAuthorizedData ? storedAuthorizedData.authorizedUser : null
      )
      setToken(storedAuthorizedData ? storedAuthorizedData.token : null)
    }
  }, [])

  const logout = () => {
    setToken(null)
    setAuthorizedUser(null)
    localStorage.removeItem(LOCALSTORAGE_NAME)
    window.location.href = '/signin'
  }

  useEffect(() => {
    login()
  }, [])

  return (
    <Context.Provider
      value={{
        info,
        setInfo,
        authorizedUser,
        setAuthorizedUser,
        token,
        setToken,
        login,
        logout,
        setSearch,
        search,
      }}
    >
      <Router>
        <Switch>
          <Route path='/' exact>
            <Layout>
              <MainPage />
            </Layout>
          </Route>
          <Route path='/memories/:userId/:share' exact>
            <Layout>
              <MemoriesPage />
            </Layout>
          </Route>
          <Route path='/profile' exact>
            <Layout>
              <ProfilePage />
            </Layout>
          </Route>
          <Route path='/signup'>
            <Layout sign>
              <Sign signup />
            </Layout>
          </Route>
          <Route path='/signin'>
            <Layout sign>
              <Sign />
            </Layout>
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </Context.Provider>
  )
}
