import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, CircularProgress } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '60vh',
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    color: blueGrey[600],
  },
}))

export const Loading = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CircularProgress size={100} thickness={1} />
    </Box>
  )
}
