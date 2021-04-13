import React, { useContext } from 'react'
import { Context } from '../context'
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
  const { authorizedUser } = useContext(Context)

  return (
    <Box className={classes.root}>
      Воспоминаний нет
      <Box ml={2}>
        {authorizedUser && (
          <Button
            href={`/memories/${authorizedUser?._id}/all`}
            color='secondary'
            variant='contained'
            size='small'
          >
            Создать
          </Button>
        )}
      </Box>
    </Box>
  )
}
