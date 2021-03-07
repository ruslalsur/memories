import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../hooks/request'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { Memory } from '../components/Memory'
import {
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NO_IMAGE } from '../config'

const useStyles = makeStyles((theme) => ({
  memList: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10,
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
  memsUserName: {
    color: theme.palette.secondary.light,
  },
  loading: {
    marginLeft: '0.5rem',
    color: theme.palette.success.dark,
  },
}))

export const MemoriesPage = ({ setInfo }) => {
  const classes = useStyles()
  const [memories, setMemories] = useState([])
  const [selected, select] = useState(null)
  const { request, loading } = useRequest()
  const { userId } = useParams()

  useEffect(() => {
    const fetchMemories = async () => {
      setInfo(null)
      try {
        const data = await request(`/api/memory/user/${userId}`)
        setMemories(data)
      } catch (e) {
        setInfo(e)
      }
    }

    fetchMemories()
  }, [])

  const createMemory = async (formData) => {
    setInfo(null)
    let document = {}
    try {
      if (formData.image) {
        let fd = new FormData()

        fd.append(
          'nameOfFile',
          `${nanoid()}.${formData.image.type.split('/')[1]}`
        )
        fd.append('file', formData.image)
        const { data } = await axios.post('/api/memory/upload', fd)

        document = { ...formData, image: data }
      } else {
        document = { ...formData, image: NO_IMAGE }
      }

      const created = await request(`/api/memory`, 'POST', document)

      setMemories((memories) => {
        return [...memories, created]
      })

      select(memories.length)
    } catch (e) {
      setInfo(e)
    }
  }

  const updateMemory = async (formData) => {
    setInfo(null)

    try {
      let document = {}

      if (formData.image) {
        let fd = new FormData()

        fd.append(
          'nameOfFile',
          `${nanoid()}.${formData.image.type.split('/')[1]}`
        )
        fd.append('file', formData.image)
        const { data } = await axios.post('/api/memory/upload', fd)

        document = { ...formData, image: data }
      } else {
        document = { ...formData, image: NO_IMAGE }
      }

      await request(`/api/memory/${formData._id}`, 'PATCH', document)

      setMemories(
        memories.map((item, index) => (index === selected ? document : item))
      )
    } catch (e) {
      setInfo(e)
    }
  }

  const deleteMemory = async () => {
    setInfo(null)
    try {
      setMemories((memories) => {
        const deleted = memories.filter((_, i) => i !== selected)
        return deleted
      })
      await request(`/api/memory/${memories[selected]._id}`, 'DELETE')
    } catch (e) {
      setInfo(e)
    }
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={selected === null || 6}>
        <Typography variant='h6' component='h2' paragraph color='primary'>
          Воспоминания пользователя{' '}
          <span className={classes.memsUserName}>
            {memories.length ? memories[0].user.username : ''}
          </span>
          {loading && (
            <CircularProgress size={15} className={classes.loading} />
          )}
        </Typography>
        <div className={classes.memList}>
          <GridList
            spacing={5}
            cellHeight={180}
            cols={selected === null ? 6 : 4}
            className={classes.gridList}
          >
            {memories.map((memory, index) => (
              <GridListTile
                key={memory._id}
                onClick={() => select(index)}
                className={classes.gridListTile}
              >
                <img src={memory.image} alt={memory.title} />
                <GridListTileBar title={memory.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Grid>
      {selected !== null && (
        <Grid item xs={12} md={6}>
          <Memory
            memory={memories[selected]}
            select={select}
            loading={loading}
            createMemory={createMemory}
            updateMemory={updateMemory}
            handleDeleteBtnClick={deleteMemory}
          />
        </Grid>
      )}
    </Grid>
  )
}
