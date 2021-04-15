import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import noavatar from '../assets/images/noavatar.jpg'
import { blue, blueGrey, deepOrange } from '@material-ui/core/colors'
import { useStorage } from '../hooks/storage.hook'
import { IMAGES_PATH } from '../config.js'
import { Context } from '../context'
import { MemoriesIndicator } from '../components/MemoriesIndicator'
import { LOCALSTORAGE_NAME } from '../config.js'
import {
  Tooltip,
  TextField,
  Grid,
  Box,
  Badge,
  Typography,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: { minHeight: '100%' },
  profileTitle: {
    color: blueGrey[700],
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1.4rem',
  },
  userName: {
    color: theme.palette.secondary.light,
    fontFamily: 'Comfortaa',
  },
  avatar: {
    position: 'relative',
    minHeight: '60vh',
    cursor: 'pointer',
    borderRadius: 7,
    '&:hover': {
      border: `3px solid ${deepOrange['A400']}`,
      borderRadius: 7,
    },
  },

  details: {},
  details__name: {
    color: blue[700],
    fontFamily: 'Comfortaa',
    fontSize: '0.9rem',
    fontWeight: 600,
    textDecoration: 'none',
    paddingRight: 15,
  },
  details__data: {
    marginLeft: '0.5rem',
    color: blueGrey[500],
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1.2rem',
    letterSpacing: 2,
  },
  details__data_link: {
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    padding: 5,
    '&:hover': {
      boxShadow: 'inset 0 0 0 2px #53ea93',
      borderRadius: 5,
    },
  },
  details__link: {},
}))

export const ProfilePage = () => {
  const classes = useStyles()
  const { uploadImage } = useStorage()
  const {
    logout,
    token,
    setInfo,
    authorizedUser,
    setAuthorizedUser,
  } = useContext(Context)

  const [stat, setStat] = useState(null)
  const [editShow, setEditShow] = useState(false)
  const [emailValue, setEmailValue] = useState(authorizedUser?.email || '')
  const [error, setError] = useState(false)

  const handleEmailClick = (e) => {
    setEditShow(true)
  }
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value)
  }
  const handleEmailBlur = (e) => {
    if (/^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
      setError(false)
      axios
        .patch(
          `api/user/${authorizedUser._id}`,
          { email: emailValue },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setAuthorizedUser({ ...authorizedUser, email: emailValue })
          localStorage.setItem(
            LOCALSTORAGE_NAME,
            JSON.stringify({
              authorizedUser: { ...authorizedUser, email: emailValue },
              token,
            })
          )
          setInfo({ type: 'success', msg: response.data.message })
        })
        .catch((err) => {
          setInfo({
            type: 'error',
            msg: err.message || 'Ошибка при изменении почты',
          })
        })

      setEditShow(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (authorizedUser) {
      axios
        .get(`api/memory/stat/${authorizedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setStat(response.data)
        })
        .catch((err) =>
          setInfo({ type: 'error', msg: err.response.data.message })
        )
    }
  }, [])

  const handleFileInputChange = async (e) => {
    try {
      const avatarSrc = await uploadImage(e.target.files[0])
      await axios.patch(
        `/api/user/${authorizedUser._id}`,
        { avatarSrc },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setAuthorizedUser({ ...authorizedUser, avatar: avatarSrc })
      localStorage.setItem(
        LOCALSTORAGE_NAME,
        JSON.stringify({
          authorizedUser: { ...authorizedUser, avatar: avatarSrc },
          token,
        })
      )
    } catch (err) {
      setInfo({ type: 'error', msg: err.response.data.message })
    }
  }

  if (!authorizedUser) {
    return <Redirect to='/' />
  }

  return (
    <Grid container spacing={3} direction='column' className={classes.root}>
      <Grid item>
        <Box ml={1}>
          <Typography
            variant='h6'
            component='h2'
            className={classes.profileTitle}
          >
            Личный кабинет пользователя{' '}
            <span className={classes.userName}>{authorizedUser.username}</span>
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} component='label'>
            <Tooltip
              title={<Typography variant='body2'>Смена аватара</Typography>}
              placement='bottom-end'
            >
              <Box
                className={classes.avatar}
                style={{
                  background: `url(${
                    IMAGES_PATH + authorizedUser.avatar
                  }) center/cover no-repeat, url(${noavatar}) center/cover no-repeat`,
                }}
              >
                <input type='file' hidden onChange={handleFileInputChange} />
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction='column' spacing={5}>
              <Grid item>
                <Box ml={1} mt={1}>
                  <Typography
                    variant='h6'
                    component='h2'
                    className={classes.details__name}
                  >
                    логин:
                    <span className={classes.details__data}>
                      {authorizedUser.username}
                    </span>
                  </Typography>
                </Box>
                <Box ml={1}>
                  <Typography
                    variant='h6'
                    component='h2'
                    className={classes.details__name}
                  >
                    роли:
                    <span className={classes.details__data}>
                      {authorizedUser.roles
                        .map((item) => item.description)
                        .join(', ')}
                    </span>
                  </Typography>
                </Box>
                <Box ml={1}>
                  <Typography
                    variant='h6'
                    component='h2'
                    className={classes.details__name}
                  >
                    идентификатор:
                    <span className={classes.details__data}>
                      {authorizedUser._id}
                    </span>
                  </Typography>
                </Box>
                <Box
                  ml={1}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexWrap: 'nowrap',
                  }}
                >
                  <Typography
                    onClick={handleEmailClick}
                    variant='h6'
                    component='h2'
                    className={classes.details__name}
                  >
                    email:
                    {!editShow && (
                      <Tooltip
                        title={
                          (authorizedUser?.email ? 'изменить' : 'добавить') +
                          ' адрес'
                        }
                      >
                        <span
                          className={`${classes.details__data} ${classes.details__data_link}`}
                        >
                          {authorizedUser?.email || 'добавить'}
                        </span>
                      </Tooltip>
                    )}
                  </Typography>

                  {editShow && (
                    <TextField
                      color='primary'
                      onBlur={handleEmailBlur}
                      onChange={handleEmailChange}
                      name='email'
                      label='введите email'
                      value={emailValue}
                      autoFocus
                      error={error}
                      helperText={error ? 'неверный формат' : ''}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item>
                <Box ml={1} mb={3} display='flex'>
                  <Badge
                    badgeContent={String(stat?.memoriesCount || 'нет')}
                    color='primary'
                  >
                    <Button
                      size='small'
                      variant='outlined'
                      color='primary'
                      href={`/memories/${authorizedUser._id}/all`}
                    >
                      <Box height={40} display='flex' alignItems='center'>
                        воспоминаний
                      </Box>
                    </Button>
                  </Badge>
                </Box>
                <Box ml={1} mb={3} display='flex'>
                  <Badge
                    badgeContent={String(stat?.publicMemoriesCount || 'нет')}
                    color='primary'
                  >
                    <Button
                      size='small'
                      variant='outlined'
                      color='primary'
                      href={`/memories/${authorizedUser._id}/public`}
                    >
                      <Box height={40} display='flex' alignItems='center'>
                        публичных
                      </Box>
                      <MemoriesIndicator
                        value={
                          (100 / stat?.memoriesCount) *
                          stat?.publicMemoriesCount
                        }
                        color='primary'
                      />
                    </Button>
                  </Badge>
                </Box>
                <Box ml={1} mb={3} display='flex'>
                  <Badge
                    badgeContent={String(stat?.privateMemoriesCount || 'нет')}
                    color='error'
                  >
                    <Button
                      size='small'
                      variant='outlined'
                      color='secondary'
                      href={`/memories/${authorizedUser._id}/private`}
                    >
                      <Box height={40} display='flex' alignItems='center'>
                        приватных
                      </Box>
                      <MemoriesIndicator
                        value={
                          (100 / stat?.memoriesCount) *
                          stat?.privateMemoriesCount
                        }
                        color='secondary'
                      />
                    </Button>
                  </Badge>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Box ml={1}>
          <Button
            onClick={logout}
            size='small'
            variant='contained'
            color='secondary'
          >
            Выйти из акаунта
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
