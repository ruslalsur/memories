import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'
import { Container, AppBar, Toolbar, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    fontFamily: 'Roboto',
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'white',
  },
}))

export const Navbar = (props) => {
  const { appName } = props
  const classes = useStyles()

  return (
    <AppBar position='sticky' color='primary'>
      <Container>
        <Toolbar disableGutters>
          <Link to='/' className={classes.title}>
            {appName}
          </Link>
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
