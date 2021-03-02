import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
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
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': { border: '2px solid #fff' },
    '&:active': { border: '4px solid #fff' },
  },
}))

export const MemoriesPage = ({ memories }) => {
  // const [memories, setMemories] = useState([])
  const { id } = useParams()
  const history = useHistory()
  // const { request, loading, error } = useRequest()
  const classes = useStyles()

  // useEffect(() => {
  //   const fetchMemories = async () => {
  //     try {
  //       const data = await request(`/api/memory/user/${id}`)
  //       setMemories(data)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }

  //   fetchMemories()
  // }, [request, id])

  // if (loading) {
  //   return <CircularProgress color='secondary' />
  // } else if (error) {
  //   return (
  //     <Alert variant='filled' severity='error'>
  //       {error}
  //     </Alert>
  //   )
  // } else {
  // const handleClickMemory = (index) => {
  //   setCurrent(index)
  //   history.push(`/memory`)
  // }

  return (
    <Grid container>
      <Grid item>
        <Typography variant='h5' component='h2' paragraph color='primary'>
          Воспоминания пользователя{' '}
          {memories.length ? memories[0].user.username : ''}
        </Typography>
        <div className={classes.root}>
          <GridList
            spacing={5}
            cellHeight={160}
            cols={5}
            className={classes.gridList}
          >
            {memories.map((memory) => (
              // <Link to={`/memory/${memory._id}`}>
              <GridListTile
                key={memory._id}
                component={Link}
                to={`/memory/${memory._id}`}
                className={classes.gridListTile}
                // onClick={() => handleClickMemory(index)}
              >
                <img
                  src={memory.image || '/images/memories/noimage.png'}
                  alt={memory.title}
                  // style={{
                  //   maxWidth: '100%',
                  //   borderRadius: 5,
                  // }}
                />

                <GridListTileBar title={memory.title} />
              </GridListTile>
              // </Link>
            ))}
          </GridList>
        </div>
      </Grid>
    </Grid>
  )
}
