import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useRequest } from '../../hooks/request'
import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import './mainPage.css'

const useStyles = makeStyles({
  mainPageLeftSide: {
    textAlign: 'justify',
  },
  mediaCardContainer: {
    minHeight: '92%',
  },
  card: {
    minWidth: '100%',
    minHeight: '100%',
    marginBottom: 10,
  },
  media: {
    height: '50vh',
  },
})

export const MainPage = () => {
  const history = useHistory()
  const [memory, setMemory] = useState({})
  const { request, loading, error } = useRequest()
  const classes = useStyles()

  useEffect(() => {
    const fetchRandomMemory = async () => {
      const data = await request('api/memory/random')
      setMemory(data)
    }

    fetchRandomMemory()
    let id = setInterval(() => fetchRandomMemory(), 30000)
    return () => clearInterval(id)
  }, [request])

  const cardClickHandler = (id) => {
    history.push(`/memories/${id}`)
  }

  if (error) {
    return (
      <Alert variant='filled' severity='error'>
        {error}
      </Alert>
    )
  } else {
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
            Воспоминания есть у каждого
          </Typography>
          <Typography component='h5' paragraph>
            Здесь каждый сможет хранить свои воспоминания, отдельно от
            воспоминаний остальных, под видом картотеки состоящей из карточек, в
            которых могут быть фотографии и связанные с ними высказывания.
          </Typography>
          <Typography component='h5' paragraph>
            Найти нужное воспоминание можно будет указав фразу, которая может
            быть в его описании или названии.
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
            {loading ? (
              <CircularProgress color='secondary' />
            ) : (
              <Card className={classes.card}>
                <CardActionArea
                  onClick={() => cardClickHandler(memory.user._id)}
                >
                  <CardMedia
                    className={classes.media}
                    image={memory.image || '/images/memories/noimage.png'}
                    title='Sample preview'
                  />
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
            )}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
