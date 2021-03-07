import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useRequest } from '../hooks/request'
import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { RND_MEMORY_INTERVAL } from '../config.js'

const useStyles = makeStyles((theme) => ({
  mainPageLeftSide: {
    textAlign: 'justify',
    marginBottom: 30,
  },
  mediaCardContainer: {},
  card: {
    minWidth: '100%',
    minHeight: '100%',
    marginBottom: 10,
    textDecoration: 'none',
  },
  media: {
    height: '45vh',
  },
  loading: {
    marginLeft: '0.5rem',
    color: theme.palette.error.main,
  },
}))

export const MainPage = () => {
  const [memory, setMemory] = useState({})
  const { request, loading } = useRequest()
  const classes = useStyles()

  useEffect(() => {
    const fetchRandomMemory = async () => {
      const data = await request('api/memory/random')
      setMemory(data)
    }

    fetchRandomMemory()
    let id = setInterval(() => fetchRandomMemory(), RND_MEMORY_INTERVAL)
    return () => clearInterval(id)
  }, [request])

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        className={classes.mainPageLeftSide}
      >
        <Typography variant='h5' component='h2' paragraph color='primary'>
          Воспоминания есть у каждого{' '}
          {loading && (
            <CircularProgress size={17} className={classes.loading} />
          )}
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

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Grid
          container
          justify='center'
          alignContent='center'
          className={classes.mediaCardContainer}
        >
          {memory.user && (
            <Link to={`/memories/${memory.user._id}`} className={classes.card}>
              <Card>
                <CardActionArea>
                  <CardMedia className={classes.media} image={memory.image} />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h5'>
                      {memory.title}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      component='p'
                    >
                      {memory.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
