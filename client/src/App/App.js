import React, { useState, useEffect } from 'react'
import { useRequest } from '../hooks/request'
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
  const [memories, setMemories] = useState([])
  const [current, setCurrent] = useState(0)
  const { request, loading, error } = useRequest()
  const userId = '60330e0de96e077b16b6690e'

  useEffect(() => {
    document.title = APP_NAME

    const fetchMemories = async () => {
      try {
        const data = await request(`/api/memory/user/${userId}`)
        setMemories(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchMemories()
  }, [request])

  const deleteMemory = async () => {
    try {
      // await request(`/api/memory/${memories[current]._id}`, 'DELETE')
      const deleted = memories.splice(current, 1)
      console.log(`LOG: `, deleted)
      // setMemories(memories.splice(current, 1))
    } catch (e) {
      console.log(`Ошибка удаления воспоминания: `, e)
    }
  }

  return (
    <Router>
      <Header appName={APP_NAME} />
      <Container className='container' maxWidth='lg'>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/memories'>
            <MemoriesPage memories={memories} setCurrent={setCurrent} />
          </Route>
          <Route path='/memory:id'>
            <MemoryPage memories={memories} deleteMemory={deleteMemory} />
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
