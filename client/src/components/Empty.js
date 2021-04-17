import React from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1.7rem',
    color: blueGrey[600],
  },
}))

export const Empty = () => {
  const classes = useStyles()
  const { userId } = useParams()

  return (
    <Box className={classes.root}>
      Воспоминаний нет
      <Box ml={2}>
        {userId && (
          <Button
            href={`/memories/${userId}/all`}
            color='secondary'
            variant='contained'
            size='small'
          >
            <Box>Ok</Box>
          </Button>
        )}
      </Box>
    </Box>
  )
}
