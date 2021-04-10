import React, { useState, useEffect, useContext } from 'react'
import { useParams, Redirect } from 'react-router-dom'
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
    marginLeft: '0.5rem',
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
  const { setInfo, search, authorizedUser, login } = useContext(Context)

  const [loading, setLoading] = useState(true)
  const [allMemoriesCount, setAllMemoriesCount] = useState(0)
  const [memories, setMemories] = useState([])
  const [selected, select] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { userId, share } = useParams()

  const fetchMemories = async (srch = 'none', sha = 'all', p) => {
    try {
      const response = await axios.get(
        `/api/memory/user/${userId}/search/${
          srch || 'none'
        }/share/${sha}/page/${p}/perPage/${MEM_PER_PAGE}`
      )
      setMemories(response.data.memories)
      setAllMemoriesCount(response.data.allMemoriesCount)
      setTotalPages(Math.ceil(response.data.allMemoriesCount / MEM_PER_PAGE))
      setLoading(false)
    } catch (err) {
      if (err.response) {
        setInfo({ type: 'error', msg: err.response.data.message })
      } else {
        setInfo({ type: 'error', msg: err.message })
      }
      setLoading(false)
      setMemories([])
    }
  }

  useEffect(() => {
    fetchMemories(search, share)
    select(0)
    console.log(`LOG memories: `, memories)
  }, [search])

  const handlePagination = (value) => {
    select(0)
    fetchMemories(search, share, value)
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

  if (!memories.length)
    // return (
    //   <MemoryCrud
    //     data={memories[selected]}
    //     setCrudedData={updateMemoriesState}
    //   />
    // )

    return null

  return (
    <Grid container spacing={2} className={classes.root}>
      {!memories.length ? (
        <Redirect to='/profile' />
      ) : (
        <>
          <Grid item xs={12}>
            <Typography
              variant='h6'
              component='h2'
              className={classes.memListTitle}
            >
              Воспоминания пользователя
              <span className={classes.memsUserName}>
                {memories[0].user.username}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.memList}>
              <Grid container justify='center' spacing={1}>
                <Grid item xs={12}>
                  {!loading && (
                    <Memories
                      select={select}
                      memories={memories}
                      current={selected}
                    />
                  )}
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
