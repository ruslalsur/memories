import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
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

export const MainPage = ({ setInfo }) => {
  const [memory, setMemory] = useState({})
  const classes = useStyles()
  const IMG_PATH = process.env.PUBLIC_URL + 'img/'

  useEffect(() => {
    const cleanUp = () => {
      clearInterval(id)
      id = false
    }

    const getRandomMemory = async () => {
      await axios
        .get('api/memory/random')
        .then((response) => {
          id && setMemory(response.data)
        })
        .catch((error) => id && setInfo(error.message))
    }

    getRandomMemory()

    let id = setInterval(() => {
      getRandomMemory()
    }, RND_MEMORY_INTERVAL)

    id && setInfo(null)
    return cleanUp
  }, [])

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
                  <CardMedia
                    className={classes.media}
                    image={IMG_PATH + memory.imgName}
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
            </Link>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
