import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRequest } from '../../hooks/request'
import { DropzoneArea } from 'material-ui-dropzone'
import { Alert } from '@material-ui/lab'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Checkbox,
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

export const MemoryPage = ({ memories, deleteMemory }) => {
  const { id } = useParams()
  const history = useHistory()
  const { request, loading, error } = useRequest()
  const classes = useStyles()

  // const [memory, setMemory] = useState(null)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const createData = {
    title: '',
    description: '',
    image: '',
    shared: false,
  }
  const [formData, setFormData] = useState(createData)

  // useEffect(() => {
  //   const fetchMemory = async () => {
  //     try {
  //       const data = await request(`/api/memory/${id}`)
  //       setMemory(data)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }

  //   fetchMemory()
  // }, [id, request])

  const handleFormChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setFormData({ ...formData, [event.target.name]: value })
  }

  const handleImageChange = (files) => {
    setFormData({
      ...formData,
      image: files.length ? `/images/memories/${files[0].name}` : '',
    })
  }

  const handleCreateBtnClick = () => {
    setFormData(createData)
    setOpen(true)
  }

  const createMemory = async () => {
    setOpen(false)
    try {
      const created = await request(`/api/memory`, 'POST', formData)
      // setMemory(created)
    } catch (e) {
      console.log(`Ошибка создания или изменения воспоминания: `, e)
    }
  }

  const handleUpdateBtnClick = () => {
    setFormData(memory)
    setOpen(true)
  }

  const updateMemory = async () => {
    setOpen(false)
    try {
      await request(`/api/memory/${formData._id}`, 'PATCH', formData)
      // setMemory(formData)
    } catch (e) {
      console.log(`Ошибка создания или изменения воспоминания: `, e)
    }
  }

  const handleDeleteBtnClick = () => {
    history.push(`/memories`)
    deleteMemory()
  }

  if (loading) {
    return <CircularProgress color='secondary' />
  } else if (error) {
    return (
      <Alert variant='filled' severity='error'>
        {error}
      </Alert>
    )
  } else if (!memory) {
    return null
  } else {
    return (
      <>
        <Grid container justify='center'>
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
                      onClick={() => history.push(`/memories`)}
                    >
                      <ClearRoundedIcon />
                    </IconButton>
                  }
                  title={memory.title}
                  subheader={memory.description}
                />
                <CardMedia
                  className={classes.media}
                  image={memory.image || '/images/memories/noimage.png'}
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
                    <Button onClick={() => handleCreateBtnClick()}>
                      Создать
                    </Button>
                    <Button onClick={() => handleUpdateBtnClick()}>
                      Изменить
                    </Button>
                    <Button
                      color='secondary'
                      onClick={() => handleDeleteBtnClick()}
                    >
                      Удалить
                    </Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Backdrop
          className={classes.backdrop}
          style={{
            background: `url(${
              memory.image || '/images/memories/noimage.png'
            }) 0 0/cover no-repeat`,
          }}
          open={viewerOpen}
          onClick={() => setViewerOpen(false)}
        />
        <div>
          <Dialog open={open} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.shared}
                    onChange={handleFormChange}
                    name='shared'
                  />
                }
                label='Воспоминание смогут увидеть остальные'
              />
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id='title'
                name='title'
                label='Название'
                fullWidth
                value={formData.title}
                onChange={handleFormChange}
              />
              <TextField
                id='description'
                name='description'
                label='Подробности'
                multiline
                rowsMax={4}
                fullWidth
                value={formData.description}
                onChange={handleFormChange}
              />
              <DropzoneArea
                onChange={handleImageChange}
                dropzoneText='Перетащите картинку сюда '
                acceptedFiles={['image/*']}
                filesLimit={1}
                showAlerts={['error']}
                showFileNames
                initialFiles={formData.image ? [formData.image] : []}
              />
            </DialogContent>
            <DialogActions>
              {formData.hasOwnProperty('user') ? (
                <Button onClick={() => updateMemory()} color='primary'>
                  Изменить
                </Button>
              ) : (
                <Button onClick={() => createMemory()} color='primary'>
                  Создать
                </Button>
              )}

              <Button onClick={() => setOpen(false)} color='primary'>
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}
