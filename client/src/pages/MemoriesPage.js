import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MemoryCrudForm } from '../components/MemoryCrudForm'
import {
  Paper,
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
    filter: 'sepia(100%)',
    '&:hover': {
      filter: 'sepia(0%)',
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
  const initFormData = {
    title: '',
    description: '',
    imgName: '',
    shared: true,
  }
  const [memories, setMemories] = useState([])
  const [formData, setFormData] = useState(initFormData)
  const [imgFile, setImgFile] = useState(undefined)
  const [selected, select] = useState(0)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [crudFormOpen, setCrudFormOpen] = useState(false)
  const { userId } = useParams()
  const IMG_PATH = process.env.PUBLIC_URL + '/img/'

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
    setFormData(initFormData)
    setInfo(null)
    setImgFile(undefined)
    setCrudFormOpen(true)
  }

  const createMemory = async () => {
    setCrudFormOpen(false)
    let newState = formData

    try {
      if (formData.imgName) {
        const uploadedImgName = await uploadImage(imgFile)
        newState = { ...formData, imgName: uploadedImgName }

        setFormData(newState)
      }

      const response = await axios.post(`/api/memory`, newState)
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
    let newState = formData

    try {
      if (formData.imgName && formData.imgName !== NO_IMAGE) {
        const uploadedImgName = await uploadImage(imgFile)
        newState = { ...formData, imgName: uploadedImgName }

        setFormData(newState)
      }

      await axios.patch(`/api/memory/${formData._id}`, newState)
      setMemories(
        memories.map((item, index) => (index === selected ? newState : item))
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
    } catch (err) {
      setInfo(err.message)
    }
  }

  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('file', file)

    try {
      const response = await axios({
        url: '/api/memory/upload',
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'text',
      })

      return response.data
    } catch (err) {
      console.log(`Попытка загрузки файла не удалась: `, err.response)
    }
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
                  onClick={() => {
                    setInfo(null)
                    select(index)
                  }}
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

        <Grid item xs={12} md={7}>
          <Grid container justify='center'>
            <Card className={classes.cardRoot}>
              <CardHeader
                avatar={
                  <Avatar
                    alt='avatar'
                    src={IMG_PATH + memories[selected].user.avatar}
                    aria-label='avatar'
                    className={classes.avatar}
                  />
                }
                title={memories[selected].title}
                subheader={memories[selected].description}
              />
              <CardMedia
                className={classes.media}
                image={IMG_PATH + (memories[selected].imgName || NO_IMAGE)}
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
              setImgFile={setImgFile}
              handleCreateBntClick={createMemory}
              handleUpdateBntClick={updateMemory}
            />
            <Backdrop
              className={classes.backdrop}
              style={{
                background: `url(${
                  IMG_PATH + (memories[selected].imgName || NO_IMAGE)
                }) 0 0/cover no-repeat`,
              }}
              open={backdropOpen}
              onClick={() => setBackdropOpen(false)}
            />
          </Grid>
        </Grid>
      </Grid>
    )
}
