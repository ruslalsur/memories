import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MemoryCrud } from '../components/MemoryCrud'
import { Empty } from '../components/Empty'
import { Memories } from '../components/Memories'
import { makeStyles } from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors'
import { Typography, Grid, Paper, Box, Badge } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { MEM_PER_PAGE } from '../config.js'
import { Context } from '../context'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    minWidth: '100%',
  },
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
  userMemCount: {
    color: blueGrey[500],
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1rem',
  },
  paginationTitle: {
    marginRight: '0.5rem',
    color: theme.palette.secondary.light,
    fontFamily: 'Comfortaa',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: -0.7,
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
  const { setInfo, search } = useContext(Context)

  const [loading, setLoading] = useState(true)
  const [allMemoriesCount, setAllMemoriesCount] = useState(0)
  const [memories, setMemories] = useState([])
  const [selected, select] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { userId, share } = useParams()

  const fetchMemories = useCallback(async (srch = 'none', sha = 'all', p) => {
    try {
      const response = await axios.get(
        `/api/memory/user/${userId}/search/${
          srch || 'none'
        }/share/${sha}/page/${p}/perPage/${MEM_PER_PAGE}`
      )
      if (!response.data.memories.length)
        setInfo({ type: 'warning', msg: 'Нет воспоминаний' })
      setMemories(response.data.memories)
      setAllMemoriesCount(response.data.allMemoriesCount)
      setTotalPages(
        Math.ceil(response.data.allMemoriesCount / MEM_PER_PAGE) || 1
      )
      setLoading(false)
    } catch (err) {
      if (err.response) {
        setInfo({ type: 'error', msg: err.response.data.message })
      } else {
        setInfo({ type: 'error', msg: err.message })
      }
      setLoading(false)
      // setMemories([])
    }
  }, [])

  useEffect(() => {
    fetchMemories(search, share)
    select(0)
  }, [search])

  const handlePagination = (value) => {
    fetchMemories(search, share, value)
    setPage(value)
    select(0)
  }

  const updateMemoriesState = (crudOps, crudedData) => {
    const balance = allMemoriesCount ? allMemoriesCount % MEM_PER_PAGE : 1

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
        if (memories.length) {
          setAllMemoriesCount(0)
        }
        if (memories.length === 1) {
          handlePagination(page - 1)
        } else {
          handlePagination(page)
        }
        select(0)
        break
      default:
        break
    }
  }

  if (loading) return null

  return (
    <Grid
      container
      spacing={2}
      alignContent='flex-start'
      className={classes.root}
    >
      {!memories.length ? (
        <Empty />
      ) : (
        <>
          <Grid item xs={12} style={{}}>
            <Box ml={1}>
              <Typography
                variant='h6'
                component='h2'
                className={classes.memListTitle}
              >
                Воспоминания пользователя
                <span className={classes.memsUserName}>
                  <Badge
                    badgeContent={String(allMemoriesCount || 'нет')}
                    color='default'
                    classes={{ badge: classes.userMemCount }}
                  >
                    <Box mr={1}>{memories[0].user?.username}</Box>
                  </Badge>
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.memList}>
              <Grid container spacing={1} justify='flex-end'>
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
                  <Grid container>
                    {totalPages > 1 && (
                      <Box display='flex' alignItems='center' mr={1}>
                        <Typography
                          variant='h6'
                          component='h6'
                          className={classes.paginationTitle}
                        >
                          Страница :
                        </Typography>
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={(event, value) => handlePagination(value)}
                          variant='outlined'
                          color='secondary'
                          size='small'
                          hideNextButton
                          hidePrevButton
                        />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}

      <Grid item xs={12} md={7}>
        <Grid container>
          <MemoryCrud
            data={memories[selected]}
            setCrudedData={updateMemoriesState}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
