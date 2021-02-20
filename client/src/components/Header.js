import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'
import { Container, AppBar, Toolbar, IconButton, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: 'white',
  },
  toolbar__left: {
    flexGrow: 1,
    textShadow: '0 0 4px #fff',
    letterSpacing: '1px',
  },
  title: {
    textDecoration: 'none',
    fontFamily: 'Roboto',
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'white',
    '&:hover': {
      fontWeight: 410,
    },
  },
}))

export const Header = (props) => {
  const { appName } = props
  const classes = useStyles()

  return (
    <AppBar position='static' color='primary'>
      <Container>
        <Toolbar disableGutters style={{ minHeight: '54px' }}>
          <Box className={classes.toolbar__left}>
            <Link to='/' className={classes.title}>
              {appName}
            </Link>
          </Box>
          <Box className={classes.toolbar__right}>
            <Link to='/auth' className={classes.button}>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
