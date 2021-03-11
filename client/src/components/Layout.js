import React, { useState, cloneElement } from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Header } from './Header'
import { APP_NAME } from '../config.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  },
  content: {
    overflowX: 'auto',
    alignSelf: 'stretch,',
    marginTop: '2rem',
  },
  footer: {
    marginTop: 10,
  },
}))

export const Layout = ({ children }) => {
  const classes = useStyles()
  const [info, setInfo] = useState(null)
  const childrenClone = cloneElement(children, { setInfo: setInfo })

  return (
    <div className={classes.root}>
      <Header appName={APP_NAME} />
      <Container className={classes.content}>{childrenClone}</Container>
      {info && (
        <Alert className={classes.footer} severity='warning'>
          <AlertTitle>Уведомление</AlertTitle>
          {info}
        </Alert>
      )}
    </div>
  )
}
