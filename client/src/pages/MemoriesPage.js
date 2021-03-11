import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { MemoryCrudForm } from '../components/MemoryCrudForm'
import {
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  ButtonGroup,
  Button,
  Backdrop,
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
  cardRoot: {
    minWidth: '100%',
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export const MemoriesPage = ({ setInfo }) => {
  const classes = useStyles()
  const [memories, setMemories] = useState([])
  const [formData, setFormData] = useState({})
  const [selected, select] = useState(0)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [crudFormOpen, setCrudFormOpen] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    axios
      .get(`/api/memory/user/${userId}`)
      .then((response) => setMemories(response.data))
      .catch((error) => {
        if (error.response) {
          setInfo(error.response.data.message)
        } else {
          setInfo(error.message)
        }
      })
  }, [])

  const handleCreateBtnClick = () => {
    setFormData({
      title: '',
      description: '',
      image: undefined,
      shared: false,
    })
    setInfo(null)
    setCrudFormOpen(true)
  }

  const createMemory = async () => {
    setCrudFormOpen(false)
    let document = {}

    try {
      if (formData.image) {
        document = { ...formData, image: await uploadImage() }
      } else {
        document = { ...formData, image: NO_IMAGE }
      }

      const response = await axios.post(`/api/memory`, document)
      console.log(`LOG res: `, response)
      if (response.status !== 201) {
        throw new Error(
          `Воспоминание с нзванием ${formData.title} уже существует`
        )
      }
      setMemories((memories) => {
        return [...memories, response.data]
      })

      select(memories.length)
    } catch (error) {
      if (error.response) {
        setInfo(error.response.data.message)
      } else {
        setInfo(error.message)
      }
    }
  }

  const handleUpdateBtnClick = () => {
    setInfo(null)
    setFormData(memories[selected])
    setCrudFormOpen(true)
  }

  const updateMemory = async () => {
    setInfo(null)
    setCrudFormOpen(false)
    let document = {}

    try {
      if (formData.image) {
        document = { ...formData, image: await uploadImage() }
      } else {
        document = { ...formData, image: NO_IMAGE }
      }

      await axios.patch(`/api/memory/${formData._id}`, document)

      setMemories(
        memories.map((item, index) => (index === selected ? document : item))
      )
    } catch (error) {
      if (error.response) {
        setInfo(error.response.data.message)
      } else {
        if (error.response) {
          setInfo(error.response.data.message)
        } else {
          setInfo(error.message)
        }
      }
    }
  }

  const deleteMemory = async () => {
    setInfo(null)
    if (memories.length <= 1) {
      setInfo('Не стирайте совсем все воспоминания ...')
      return null
    }
    try {
      await axios.delete(`/api/memory/${memories[selected]._id}`)

      select(selected - 1)
      setMemories((memories) => memories.filter((_, i) => i !== selected))
    } catch (error) {
      setInfo(error.message)
    }
  }

  const uploadImage = async () => {
    const fd = new FormData()
    fd.append('nameOfFile', `${nanoid()}.${formData.image.type.split('/')[1]}`)
    fd.append('file', formData.image)

    const response = await axios({
      url: '/api/memory/upload',
      method: 'POST',
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'text',
    })
    return response.data
  }

  if (!memories.length) return null
  else
    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant='h6' component='h2' paragraph color='primary'>
            Воспоминания пользователя{' '}
            <span className={classes.memsUserName}>
              {memories[0].user.username}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.memList}>
            <GridList
              spacing={4}
              cellHeight={180}
              cols={3}
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

        <Grid item xs={12} md={7}>
          <Grid container justify='center'>
            <Card className={classes.cardRoot}>
              <CardHeader
                avatar={
                  <Avatar
                    alt='avatar'
                    src={memories[selected].user.avatar}
                    aria-label='avatar'
                    className={classes.avatar}
                  />
                }
                title={memories[selected].title}
                subheader={memories[selected].description}
              />
              <CardMedia
                className={classes.media}
                image={memories[selected].image}
                title='Увеличить'
                onClick={() => setBackdropOpen(true)}
              />

              <CardActions disableSpacing>
                <ButtonGroup
                  className={classes.btnGroup}
                  color='primary'
                  size='small'
                  aria-label='outlined primary button group'
                >
                  <Button onClick={() => handleCreateBtnClick()}>
                    Создать
                  </Button>
                  <Button onClick={() => handleUpdateBtnClick(true)}>
                    Изменить
                  </Button>
                  <Button color='secondary' onClick={() => deleteMemory()}>
                    Удалить
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Card>
            <MemoryCrudForm
              open={crudFormOpen}
              setOpen={setCrudFormOpen}
              data={formData}
              setData={setFormData}
              handleCreateBntClick={createMemory}
              handleUpdateBntClick={updateMemory}
            />
            <Backdrop
              className={classes.backdrop}
              style={{
                background: `url(${memories[selected].image}) 0 0/cover no-repeat`,
              }}
              open={backdropOpen}
              onClick={() => setBackdropOpen(false)}
            />
          </Grid>
        </Grid>
      </Grid>
    )
}
