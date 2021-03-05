import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../hooks/request'
import axios from 'axios'
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
  const { request, loading, error } = useRequest()
  const { userId } = useParams()

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await request(`/api/memory/user/${userId}`)
        setMemories(data)
      } catch (e) {
        setInfo(error)
        console.log(e)
      }
    }

    fetchMemories()
  }, [])

  const createMemory = async (formData) => {
    const data = { ...formData }
    data.image = `/images/memories/${formData.image.name}`

    try {
      const created = await request(`/api/memory`, 'POST', data)

      let fd = new FormData()
      fd.append('file', formData.image)
      const uploaded = await axios.post('/api/memory/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMemories((memories) => {
        return [...memories, created]
      })

      select(memories.length)
    } catch (e) {
      console.log(`Ошибка создания или изменения воспоминания: `, e)
    }
  }

  const updateMemory = async (formData) => {
    try {
      await request(`/api/memory/${formData._id}`, 'PATCH', formData)
      setMemories(
        memories.map((item, index) => (index === selected ? formData : item))
      )
    } catch (e) {
      console.log(`Ошибка создания или изменения воспоминания: `, e)
    }
  }

  const handleDeleteBtnClick = async () => {
    try {
      setMemories((memories) => {
        const deleted = memories.filter((_, i) => i !== selected)
        return deleted
      })
      await request(`/api/memory/${memories[selected]._id}`, 'DELETE')
      // select(null)
    } catch (e) {
      console.log(`Ошибка удаления воспоминания: `, e)
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
            handleDeleteBtnClick={handleDeleteBtnClick}
          />
        </Grid>
      )}
    </Grid>
  )
}
