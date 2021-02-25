import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../../hooks/request'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  Avatar,
  Typography,
  Grid,
  ButtonGroup,
  Button,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { IMGDIR } from '../../config'
import './memoryPage.css'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '93%',
    marginBottom: 30,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  btnGroup: {
    paddingTop: 13,
    paddingRight: 10,
  },
}))

export const MemoryPage = () => {
  const [memory, setMemory] = useState(null)
  const { id } = useParams()
  const { request, loading } = useRequest()
  const classes = useStyles()

  const fetchMemory = useCallback(async () => {
    const data = await request(`/api/memory/${id}`)
    setMemory(data)
  }, [request, id])

  useEffect(() => {
    fetchMemory()
  }, [])

  return loading || !memory ? (
    <CircularProgress color='secondary' />
  ) : (
    <Grid container justify='center'>
      <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
        <Grid container justify='center'>
          <Card className={classes.root} raised>
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <ButtonGroup
                  className={classes.btnGroup}
                  color='primary'
                  size='small'
                  aria-label='outlined primary button group'
                >
                  <Button onClick={() => console.log(`LOG: `, 1)}>
                    Создать
                  </Button>
                  <Button onClick={() => console.log(`LOG: `, 2)}>
                    Изменить
                  </Button>
                  <Button
                    color='secondary'
                    onClick={() => console.log(`LOG: `, 3)}
                  >
                    Удалить
                  </Button>
                </ButtonGroup>
              }
              title={memory.title}
              subheader={`Автор: ${memory.user.username}`}
            />
            <CardMedia
              className={classes.media}
              image={`${IMGDIR}/memories/${memory.image}`}
              title='Paella dish'
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                {memory.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}
