import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'

import { IMAGES_PATH } from '../config.js'
import noavatar from '../assets/images/noavatar.jpg'
import {
  Container,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'
import { Context } from '../context'
import { Search } from './Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '54px',
    justifyContent: 'center',
    backgroundColor: blueGrey[600],
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    marginLeft: 10,
  },
  toolbar__left: {
    textShadow: '0 0 4px #fff',
    letterSpacing: '1px',
  },
  toolbar__right: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  title: {
    textDecoration: 'none',
    fontFamily: 'Marck Script',
    fontSize: '2rem',
    color: 'white',
    '&:hover': {
      textShadow: '0px 0px 15px #fff',
      fontWeight: 500,
    },
    userName: {
      fontFamily: 'Comfortaa',
      fontSize: '1.1rem',
    },
  },
}))

export const Header = ({ appName }) => {
  const classes = useStyles()
  let history = useHistory()
  const { authorizedUser } = useContext(Context)

  const handleProfileBtn = () => {
    history.push(authorizedUser ? '/profile' : '/signin')
  }

  return (
    <AppBar position='static' className={classes.root}>
      <Container>
        <Toolbar disableGutters variant='dense' className={classes.wrapper}>
          <Box className={classes.toolbar__left}>
            <Tooltip
              title={
                <Typography variant='body2'>
                  Переход на главную страницу
                </Typography>
              }
              placement='bottom'
            >
              <Link to='/' className={classes.title}>
                {appName}
              </Link>
            </Tooltip>
          </Box>
          {history.location.pathname.split('/')[1] === 'memories' && (
            <Box className={classes.toolbar__center}>
              <Search />
            </Box>
          )}
          <Box className={classes.toolbar__right}>
            <span className={classes.userName}>
              {authorizedUser?.username || ''}
            </span>
            <Tooltip
              title={
                authorizedUser ? (
                  <Typography variant='body2'>
                    Личный кабинет пользователя "{authorizedUser?.username}"
                  </Typography>
                ) : (
                  <Typography variant='body2'>Вход и регистация</Typography>
                )
              }
              placement='bottom'
            >
              <IconButton
                onClick={handleProfileBtn}
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                {authorizedUser ? (
                  <Avatar
                    className={classes.avatar}
                    alt={authorizedUser.username.toUpperCase()}
                    src={
                      authorizedUser.avatar
                        ? IMAGES_PATH + authorizedUser.avatar
                        : noavatar
                    }
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
