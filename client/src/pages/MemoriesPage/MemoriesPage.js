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
import { makeStyles } from '@material-ui/core/styles'
import { IMGDIR } from '../../config'

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
    '&:hover': { border: '1px solid #fff' },
    '&:active': { border: '3px solid #fff' },
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))

export const MemoriesPage = () => {
  const [memories, setMemories] = useState([])
  const { userId } = useParams()
  const history = useHistory()
  const { request, loading } = useRequest()
  const classes = useStyles()

  const fetchMemories = useCallback(async () => {
    const data = await request(`/api/memory/user/${userId}`)
    setMemories(data)
  }, [request, userId])

  useEffect(() => {
    fetchMemories()
  }, [])

  return loading || !memories.length ? (
    <CircularProgress color='secondary' />
  ) : (
    <Grid container>
      <Grid item>
        <Typography variant='h5' component='h2' paragraph color='primary'>
          Воспоминания пользователя {memories[0].user.username}
        </Typography>
        <div className={classes.root}>
          <GridList
            spacing={5}
            cellHeight={200}
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
                  src={`${IMGDIR}/memories/${memory.image}`}
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
