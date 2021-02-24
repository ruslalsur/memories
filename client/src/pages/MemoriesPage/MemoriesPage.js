import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../../hooks/request'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import MediaCard from '../../components/MediaCard'
import './memoriesPage.css'

export const MemoriesPage = () => {
  const [memories, setMemories] = useState([])
  const { userId } = useParams()
  const { request, loading } = useRequest()

  const fetchMemories = useCallback(async () => {
    const data = await request(`/api/memory/user/${userId}`)

    console.log(`userId: `, userId)
    console.log(`data: `, data)
    setMemories(data)
  }, [request, userId])

  useEffect(() => {
    fetchMemories()
    console.log(`LOG memories: `, memories)
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant='h5' component='h2' paragraph color='primary'>
          Воспоминания пользователя{' '}
          {memories.length ? memories[0].user.username : ''}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {loading ? (
          <CircularProgress color='secondary' />
        ) : (
          memories.length &&
          memories.map((memory) => (
            <MediaCard
              key={memory._id}
              data={memory}
              cardClickHandler={() => {}}
            />
          ))
        )}
      </Grid>
    </Grid>
  )
}
