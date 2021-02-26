import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRequest } from '../../hooks/request'
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CircularProgress,
  Avatar,
  Grid,
  ButtonGroup,
  Button,
  IconButton,
  Backdrop,
} from '@material-ui/core'
import FormDialog from '../../components/FormDialog'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import './memoryPage.css'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '60%',
    marginBottom: 30,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
    '&:hover': {
      filter: 'grayscale(1)',
      transition: '0.5s ease-in-out',
    },
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
  btnGroup: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export const MemoryPage = () => {
  const [memory, setMemory] = useState(null)
  const [vieverOpen, setViewerOpen] = useState(false)
  const [formCreate, setFormCreate] = useState(true)
  const { id } = useParams()
  const history = useHistory()
  const childRef = useRef()
  const { request, loading } = useRequest()
  const classes = useStyles()

  const fetchMemory = useCallback(async () => {
    const data = await request(`/api/memory/${id}`)
    setMemory(data)
  }, [request, id])

  useEffect(() => {
    fetchMemory()
  }, [])

  const HandleCreateBtnClick = () => {
    setFormCreate(true)
    childRef.current.handleClickOpen()
  }

  const HandleUpdateBtnClick = () => {
    setFormCreate(false)
    childRef.current.handleClickOpen()
  }

  return loading || !memory ? (
    <CircularProgress color='secondary' />
  ) : (
    <Grid container justify='center'>
      <Backdrop
        className={classes.backdrop}
        style={{
          background: `url(${
            memory.image ?? '/images/memories/noimage.png'
          }) 0 0/cover no-repeat`,
        }}
        open={vieverOpen}
        onClick={() => setViewerOpen(false)}
      />
      <FormDialog ref={childRef} formCreate={formCreate} />
      <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
        <Grid container justify='center'>
          <Card className={classes.root} raised>
            <CardHeader
              avatar={
                <Avatar
                  alt='avatar'
                  src={memory.user.avatar}
                  aria-label='avatar'
                  className={classes.avatar}
                />
              }
              action={
                <IconButton
                  color='secondary'
                  title='Закрыть'
                  aria-label='Закрыть'
                  onClick={() => history.push(`/memories/${memory.user._id}`)}
                >
                  <ClearRoundedIcon />
                </IconButton>
              }
              title={memory.title}
              subheader={memory.description}
            />
            <CardMedia
              className={classes.media}
              image={memory.image ?? '/images/memories/noimage.png'}
              title='Увеличить'
              onClick={() => setViewerOpen(true)}
            />
            <CardActions disableSpacing>
              <ButtonGroup
                className={classes.btnGroup}
                color='primary'
                size='small'
                aria-label='outlined primary button group'
              >
                <Button onClick={() => HandleCreateBtnClick()}>Создать</Button>
                <Button onClick={() => HandleUpdateBtnClick()}>Изменить</Button>
                <Button
                  color='secondary'
                  onClick={() => console.log(`Удалить: `)}
                >
                  Удалить
                </Button>
              </ButtonGroup>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}
