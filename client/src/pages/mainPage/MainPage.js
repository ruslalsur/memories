import React, { useState, useEffect, useCallback } from 'react'
import { useRequest } from '../../hooks/request'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import MediaCard from '../../components/MediaCard'
import './mainPage.css'

export const MainPage = () => {
  const [memory, setmemory] = useState(null)
  const { request, loading } = useRequest()

  const fetchRandomMemory = useCallback(async () => {
    const data = await request('api/memory/random')
    setmemory(data)
  }, [request])

  useEffect(() => {
    fetchRandomMemory()
  }, [fetchRandomMemory])

  useEffect(() => {
    let id = setInterval(() => fetchRandomMemory(), 30000)
    return () => clearInterval(id)
  }, [fetchRandomMemory])

  const cardClickHandler = () => {
    //TODO: отображение разрещенных воспоминаний пользователя кликнутого воспоминания
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
            memory && (
              <MediaCard
                data={memory}
                cardClickHandler={() => cardClickHandler}
              />
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
