import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'
import { Container, AppBar, Toolbar, IconButton, Box } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '48px',
    justifyContent: 'center',
    backgroundColor: blueGrey[500],
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
    fontFamily: 'Marck Script',
    fontSize: '2rem',
    color: 'white',
    '&:hover': {
      textShadow: '0px 0px 15px #fff',
      fontWeight: 500,
    },
  },
}))

export const Header = ({ appName }) => {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.root}>
      <Container>
        <Toolbar disableGutters variant='dense'>
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
