import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import {
  Grid,
  Box,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import { blueGrey } from '@material-ui/core/colors'
import { NO_IMAGE, RND_MEMORY_INTERVAL } from '../config.js'

const useStyles = makeStyles((theme) => ({
  mainPageLeftSide: {
    textAlign: 'justify',
  },
  titleText: {
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1.3rem',
    color: blueGrey[700],
    paddingBottom: 7,
    paddingLeft: 15,
  },
  paperText: {
    color: blueGrey[600],
    padding: 15,
    fontFamily: 'Comfortaa',
    fontSize: '0.85rem',
    lineHeight: 1.3,
    '& p': {
      marginBottom: 10,
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  paperListLink: {
    textDecoration: 'none',
    color: 'inherit',
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
    filter: 'opacity(0.9)',
    '&:hover': {
      filter: 'opacity(1)',
      transition: '0.5s ease-in-out',
    },
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
        .catch((err) => {
          setMemory(null)
          id && setInfo(err.message)
        })
    }

    getRandomMemory()

    let id = setInterval(() => {
      getRandomMemory()
    }, RND_MEMORY_INTERVAL)

    id && setInfo(null)
    return cleanUp
  }, [])

  if (memory === null) {
    return <Redirect to='/memories/60330e0de96e077b16b6690e' />
  } else {
    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className={classes.mainPageLeftSide}
        >
          <Grid container spacing={3}>
            <Grid item>
              <Box className={classes.titleText}>
                Воспоминания есть у каждого
              </Box>
              <Paper className={classes.paperText}>
                <p>
                  Здесь каждый сможет хранить свои воспоминания, отдельно от
                  воспоминаний остальных, часть которых сделав доступными для
                  просмотра всем. Воспоминания будут храниться под видом
                  картотеки состоящей из карточек, в которых могут быть
                  фотографии и связанные с ними высказывания c заголовком.
                </p>
                <p>
                  На этой странице, для примера, показыаются случайным образом
                  выбранные воспоминания пользователей, из набора доступных для
                  всеобщего просмотра, нажав на которое можно будет увидеть
                  остальные, разрешенные для просмотра, воспоминания этого
                  пользователя.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.titleText}>
                Стек использованых технологий
              </Box>
              <Paper>
                <Box className={classes.paperText}>
                  <p style={{ marginBottom: 0 }}>
                    При создании проекта был использован следующий набор
                    технологий:
                  </p>
                  <List
                    dense
                    className={classes.paperList}
                    component='nav'
                    aria-label='main mailbox folders'
                  >
                    <Grid container spacing={4}>
                      <Grid item>
                        <a
                          className={classes.paperListLink}
                          href='https://www.mongodb.com/'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='MongoDB' />
                          </ListItem>
                        </a>
                        <a
                          className={classes.paperListLink}
                          href='https://mongoosejs.com/'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Mongoose' />
                          </ListItem>
                        </a>
                        <a
                          className={classes.paperListLink}
                          href='https://nodejs.org/en/'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Node.js' />
                          </ListItem>
                        </a>
                        <a
                          className={classes.paperListLink}
                          href='http://expressjs.com/'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Express' />
                          </ListItem>
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          className={classes.paperListLink}
                          href='https://ru.reactjs.org/'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='React.js' />
                          </ListItem>
                        </a>
                        <a
                          className={classes.paperListLink}
                          href='https://material-ui.com/ru/'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Material-UI' />
                          </ListItem>
                        </a>
                      </Grid>
                    </Grid>
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Grid
            container
            justify='center'
            alignContent='center'
            className={classes.mediaCardContainer}
          >
            {memory.user && (
              <Link
                to={`/memories/${memory.user._id}`}
                className={classes.card}
              >
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={IMG_PATH + (memory.imgName || NO_IMAGE)}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='h5'
                        style={{ fontFamily: 'Yanone Kaffeesatz' }}
                      >
                        {memory.title}
                      </Typography>
                      <Typography
                        variant='body1'
                        color='textSecondary'
                        component='p'
                        style={{ fontFamily: 'Comfortaa' }}
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
}
