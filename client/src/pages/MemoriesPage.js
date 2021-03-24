import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MemoryCrud } from '../components/MemoryCrud'
import { Memories } from '../components/Memories'
import { makeStyles } from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors'
import { Typography, Grid, Paper } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { MEM_PER_PAGE } from '../config.js'
import { Context } from '../context'

const useStyles = makeStyles((theme) => ({
  memList: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 10,
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

export const MemoriesPage = () => {
  const classes = useStyles()
  const { setInfo } = useContext(Context)

  const [loading, setLoading] = useState(true)
  const [allMemoriesCount, setAllMemoriesCount] = useState(0)
  const [memories, setMemories] = useState([])
  const [selected, select] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(5)
  const { userId } = useParams()

  const fetchMemories = async (p) => {
    try {
      const response = await axios.get(
        `/api/memory/user/${userId}/page/${p}/perPage/${MEM_PER_PAGE}`
      )
      setMemories(response.data.memories)
      setAllMemoriesCount(response.data.allMemoriesCount)
      setTotalPages(Math.ceil(response.data.allMemoriesCount / MEM_PER_PAGE))
      setLoading(false)
    } catch (err) {
      if (err.response) {
        setInfo(err.response.data.message)
      } else {
        setInfo(err.message)
      }
      setLoading(false)
      setMemories([])
    }
  }

  useEffect(() => {
    fetchMemories(page)
    select(0)
  }, [])

  const handlePagination = (value) => {
    select(0)
    fetchMemories(value)
    setPage(value)
  }

  const updateMemoriesState = (crudOps, crudedData) => {
    const balance = allMemoriesCount % MEM_PER_PAGE
    switch (crudOps) {
      case 'update':
        setMemories(
          memories.map((item, index) =>
            index === selected ? crudedData : item
          )
        )
        break
      case 'create':
        if (balance) {
          handlePagination(totalPages)
          select(balance - 1)
        } else {
          handlePagination(totalPages + 1)
        }
        select(0)
        break
      case 'delete':
        if (memories.length !== 1) {
          handlePagination(page)
        } else {
          handlePagination(page - 1)
        }
        select(0)
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
              <Grid container justify='center' spacing={1}>
                <Grid item xs={12}>
                  <Memories select={select} memories={memories} />
                </Grid>
                <Grid item>
                  <Grid container justify='center'>
                    {totalPages > 1 && (
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => handlePagination(value)}
                        variant='outlined'
                        color='secondary'
                        size='small'
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}

      <Grid item xs={12} md={7}>
        <Grid container justify='center'>
          {!loading && (
            <MemoryCrud
              data={memories[selected]}
              setCrudedData={updateMemoriesState}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
