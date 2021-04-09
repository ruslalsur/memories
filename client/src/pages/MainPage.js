import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory, Redirect } from 'react-router-dom'
import axios from 'axios'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import { blueGrey } from '@material-ui/core/colors'
import { IMAGES_PATH, NO_IMAGE, RND_MEMORY_INTERVAL } from '../config.js'
import { Context } from '../context'
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
  Tooltip,
} from '@material-ui/core'

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
    height: '55vh',
    filter: 'opacity(0.9)',
    cursor: 'pointer',
    '&:hover': {
      filter: 'opacity(1)',
      transition: '0.5s ease-in-out',
    },
    '&:active': { transform: 'scale(0.97)', cursor: 'grabbing' },
  },
  loading: {
    marginLeft: '0.5rem',
    color: theme.palette.error.main,
  },
}))

export const MainPage = () => {
  const [memory, setMemory] = useState({})
  const classes = useStyles()
  const { setInfo } = useContext(Context)
  let history = useHistory()

  useEffect(() => {
    const cleanUp = () => {
      clearInterval(id)
      id = false
    }

    const getRandomMemory = () => {
      axios
        .get('api/memory/random')
        .then((response) => {
          id && setMemory(response.data)
        })
        .catch((err) => {
          setMemory(null)
          id &&
            setInfo({
              type: 'error',
              msg: 'Нет публичных воспоминаний ни у кого',
            })
          cleanUp()
          history.push('/')
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
    return <Redirect to='/memories/60330e0de96e077b16b6690e' /> //TODO: убрать хардкор
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
                  На этой странице, для примера, через некоторый интервал
                  времени, показыаются случайным образом выбранные воспоминания
                  пользователей, из набора доступных для всеобщего просмотра,
                  нажав на которое можно будет увидеть остальные, разрешенные
                  для просмотра, воспоминания пользователя, которому оно
                  принадлежало.
                </p>
                <p>
                  Для воспоминаний реализованы CRUD-операции, доступные после
                  авторизации, а также поиск по подстроке входящей либо в
                  название, либо в описание.
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
                          href='https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5'
                        >
                          <ListItem button>
                            <ListItemIcon>
                              <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary='SPA' />
                          </ListItem>
                        </a>
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
                to={`/memories/${memory.user._id}/public`}
                className={classes.card}
              >
                <Card>
                  <CardActionArea>
                    <Tooltip
                      title={
                        <Typography variant='body2'>
                          {`Показать все разрешенные воспоминания пользователя "${memory.user.username}"`}
                        </Typography>
                      }
                      placement='bottom'
                    >
                      <CardMedia
                        className={classes.media}
                        image={IMAGES_PATH + (memory.imgName || NO_IMAGE)}
                      />
                    </Tooltip>
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
