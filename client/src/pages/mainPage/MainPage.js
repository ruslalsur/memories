import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import MediaCard from '../../components/MediaCard'
import './mainPage.css'

export const MainPage = () => {
  const [loading, setLoading] = useState(false)
  const [memories, setMemories] = useState([])
  const [currentMemory, setCurrentMemory] = useState(0)

  async function fetchMemories(url) {
    setLoading(true)

    try {
      const response = await fetch(url)
      const data = await response.json()
      setMemories(data)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  useEffect(() => {
    fetchMemories('api/memory/memories')
  }, [])

  useEffect(() => {
    if (memories.length) {
      let id = setInterval(() => {
        setCurrentMemory(Math.floor(Math.random() * memories.length))
      }, 30000)
      console.log(`id: `, id)
      return () => clearInterval(id)
    }
  }, [memories.length])

  const cardClickHandler = () => {
    if (currentMemory < memories.length - 1) {
      setCurrentMemory(currentMemory + 1)
    } else {
      setCurrentMemory(0)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        lg={4}
        xl={4}
        className='main-page-left-side'
      >
        <Typography variant='h5' component='h2' paragraph color='primary'>
          Воспоминания есть у каждого.
        </Typography>
        <Typography component='h5' paragraph>
          Здесь каждый сможет хранить свои воспоминания, отдельно от
          воспоминаний остальных, под видом картотеки состоящей из карточек, в
          которых могут быть фотографии и связанные с ними высказывания.
        </Typography>
        <Typography component='h5' paragraph>
          Найти нужное воспоминание можно будет указав фразу, которая может быть
          в его описании или названии.
        </Typography>
        <Typography component='h5' paragraph>
          Здесь, для примера, показано одно случайное воспоминание, из набора
          разрешенных пользователями для всеобщего просмотра.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
        <Grid
          container
          justify='center'
          alignContent='center'
          className='media-card-container'
        >
          {loading ? (
            <CircularProgress color='secondary' />
          ) : (
            memories.length && (
              <MediaCard
                data={memories[currentMemory]}
                cardClickHandler={cardClickHandler}
              />
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
