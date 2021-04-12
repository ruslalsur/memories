import React, { useContext, cloneElement } from 'react'
import { Container, Snackbar } from '@material-ui/core'
import { Header } from './Header'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
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
}))

export const Layout = ({ children, sign }) => {
  const classes = useStyles()
  const { info, setInfo } = useContext(Context)

  const childrenClone = cloneElement(children)

  return (
    <div className={classes.root}>
      {sign ? (
        childrenClone
      ) : (
        <>
          <Header appName={process.env.REACT_APP_NAME} />
          <Container className={classes.content}>{childrenClone}</Container>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transitionDuration={200}
        open={!!info}
        autoHideDuration={5000}
        onClose={() => setInfo(null)}
      >
        <Alert elevation={6} variant='filled' severity={info?.type || 'info'}>
          {info?.msg || ''}
        </Alert>
      </Snackbar>
    </div>
  )
}
