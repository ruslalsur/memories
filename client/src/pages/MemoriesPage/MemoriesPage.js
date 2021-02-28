import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRequest } from '../../hooks/request'
import {
  CircularProgress,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    margingBottom: 30,
  },
  gridListTile: {
    cursor: 'pointer',
    '&:hover': { border: '2px solid #fff' },
    '&:active': { border: '4px solid #fff' },
  },
}))

export const MemoriesPage = () => {
  const [memories, setMemories] = useState([])
  const { userId } = useParams()
  const history = useHistory()
  const { request, loading, error } = useRequest()
  const classes = useStyles()

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await request(`/api/memory/user/${userId}`)
        setMemories(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchMemories()
  }, [])

  return loading || !memories.length ? (
    !error ? (
      <CircularProgress color='secondary' />
    ) : (
      <Alert variant='filled' severity='error'>
        {error}
      </Alert>
    )
  ) : (
    <Grid container>
      <Grid item>
        <Typography variant='h5' component='h2' paragraph color='primary'>
          Воспоминания пользователя {memories[0].user.username}
        </Typography>
        <div className={classes.root}>
          <GridList
            spacing={5}
            cellHeight={160}
            cols={5}
            className={classes.gridList}
          >
            {memories.map((memory) => (
              <GridListTile
                key={memory._id}
                className={classes.gridListTile}
                onClick={() => history.push(`/memory/${memory._id}`)}
              >
                <img
                  src={memory.image || '/images/memories/noimage.png'}
                  alt={memory.title}
                />
                <GridListTileBar title={memory.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Grid>
    </Grid>
  )
}
