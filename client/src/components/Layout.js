import React, { useState, cloneElement } from 'react'
import { Container } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Header } from './Header'
import { makeStyles } from '@material-ui/core/styles'
import { Context } from '../context'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
  },
  header: {
    flex: '0 0 auto',
  },
  content: {
    overflowX: 'auto',
    flex: '1 1 100%',
    paddingTop: '1rem',
  },
  footer: {
    marginTop: 10,
  },
}))

export const Layout = ({ children }) => {
  const classes = useStyles()
  const [info, setInfo] = useState(null)
  const childrenClone = cloneElement(children, { setInfo })
  // const authorizedUser = { _id: '60330e0de96e077b16b6690e' }
  const authorizedUser = null

  return (
    <Context.Provider value={{ setInfo, authorizedUser }}>
      <div className={classes.root}>
        <Header appName={process.env.REACT_APP_NAME} />
        <Container className={classes.content}>{childrenClone}</Container>
        {info && (
          <Alert className={classes.footer} severity='warning'>
            <AlertTitle>Внимание!</AlertTitle>
            {info}
          </Alert>
        )}
      </div>
    </Context.Provider>
  )
}
