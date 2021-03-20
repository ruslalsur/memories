import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MemoryCrud } from '../components/MemoryCrud'
import { makeStyles } from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors'
import { NO_IMAGE } from '../config'
import {
  Paper,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  memList: {
    backgroundColor: theme.palette.background.paper,
  },
  memListTitle: {
    color: blueGrey[700],
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1.3rem',
  },
  memsUserName: {
    color: theme.palette.secondary.light,
    fontFamily: 'Comfortaa',
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    padding: 7,
  },

  gridListTile: {
    overflow: 'hidden',
    cursor: 'pointer',
    filter: 'grayscale(100%) opacity(80%) sepia(0%)',
    transition: '0.3s ease-in-out',
    '& .MuiGridListTile-tile': {
      borderRadius: 5,
    },
    '&:hover': {
      transform: 'scale(1.03)',
      filter: 'grayscale(0%) opacity(80%) sepia(100%)',
    },
    '&:active': { transform: 'scale(0.97)' },
  },
}))

export const MemoriesPage = ({ setInfo }) => {
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [memories, setMemories] = useState([])
  const [selected, select] = useState(0)
  const { userId } = useParams()
  const IMG_PATH = process.env.PUBLIC_URL + '/img/'

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get(`/api/memory/user/${userId}`)
        setMemories(response.data)
        setLoading(false)
      } catch (err) {
        if (err.response) {
          setInfo(err.response.data.message)
        } else {
          setInfo(err.message)
        }
        setLoading(false)
      }
    }

    fetchMemories()
  }, [])

  const handlleMemoryClick = (index) => {
    setInfo(null)
    select(index)
  }

  const updateMemoriesState = (crudOps, crudedData) => {
    switch (crudOps) {
      case 'create':
        setMemories([...memories, crudedData])
        select(memories.length)
        break
      case 'update':
        setMemories(
          memories.map((item, index) =>
            index === selected ? crudedData : item
          )
        )
        break
      case 'delete':
        if (memories.length) {
          select(0)
        }
        setMemories((memories) => memories.filter((_, i) => i !== selected))
        break
      default:
        break
    }
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      {!memories.length ? (
        ''
      ) : (
        <>
          <Grid item xs={12}>
            <Typography
              variant='h6'
              component='h2'
              paragraph
              className={classes.memListTitle}
            >
              Воспоминания пользователя{' '}
              <span className={classes.memsUserName}>
                {memories[0].user.username}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.memList}>
              <GridList
                spacing={5}
                cellHeight={160}
                cols={3}
                className={classes.gridList}
              >
                {memories.map((memory, index) => (
                  <GridListTile
                    key={memory._id}
                    onClick={() => handlleMemoryClick(index)}
                    className={classes.gridListTile}
                  >
                    <img
                      src={IMG_PATH + (memory.imgName || NO_IMAGE)}
                      alt={memory.imgName}
                    />
                    <GridListTileBar title={memory.title} />
                  </GridListTile>
                ))}
              </GridList>
            </Paper>
          </Grid>
        </>
      )}

      <Grid item xs={12} md={7}>
        <Grid container justify='center'>
          {!loading && (
            <MemoryCrud
              setInfo={setInfo}
              data={memories[selected]}
              setCrudedData={updateMemoriesState}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
