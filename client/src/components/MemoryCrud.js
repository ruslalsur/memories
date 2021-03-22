import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../context'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { IMAGES_PATH, NO_IMAGE, NO_AVATAR } from '../config'
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
  Avatar,
  ButtonGroup,
  Button,
  Backdrop,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: '100%',
    marginBottom: 30,
  },
  media: {
    height: '50vh',
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
    cursor: 'pointer',
    margin: 20,
  },
  btnGroup: {},
  form: {
    '& > *': {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
  },
  dropZone: {},
  dropParagrarh: {
    color: '#777',
    fontSize: '1.2rem',
  },
}))

export const MemoryCrud = ({ data, setCrudedData }) => {
  const classes = useStyles()
  const initFormData = {
    title: '',
    description: '',
    imgName: '',
    shared: true,
  }

  const [backdropOpen, setBackdropOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initFormData)
  const [imgFile, setImgFile] = useState(undefined)
  const { setInfo } = useContext(Context)

  useEffect(() => {
    if (!data) {
      setFormData(initFormData)
      setOpen(true)
    }
  }, [data])

  const handleFormChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setFormData({ ...formData, [event.target.name]: value })
  }

  const handleImageChange = (files) => {
    setImgFile(files.length ? files[0] : undefined)
    setFormData({
      ...formData,
      imgName: files.length ? files[0].name : '',
    })
  }

  const handleShowCrudForm = (isUpdate) => {
    if (isUpdate) {
      setFormData(data)
    } else {
      setFormData(initFormData)
      setImgFile(undefined)
    }
    setInfo(null)
    setOpen(true)
  }

  const createUpdateMemory = async (isCreate) => {
    setInfo(null)
    setOpen(false)
    let newState = formData

    try {
      if (formData.imgName) {
        const uploadedImgName = await uploadImage(imgFile)
        newState = { ...formData, imgName: uploadedImgName }
      }

      let todo = 'создано'
      if (isCreate) {
        const response = await axios.post(`/api/memory`, newState)
        setCrudedData('create', response.data)
      } else {
        await axios.patch(`/api/memory/${formData._id}`, newState)
        setCrudedData('update', newState)
        todo = 'изменено'
      }
      setInfo(`Воспоминание с заголовком "${newState.title}" было ${todo}`)
    } catch (err) {
      if (err.response) {
        setInfo(err.response.data.message)
      } else {
        if (err.response) {
          setInfo(err.response.data.message)
        } else {
          setInfo(err.message)
        }
      }
    }
  }

  const deleteMemory = async () => {
    setInfo(null)

    try {
      const deleted = await axios.delete(`/api/memory/${data._id}`)
      setInfo(`Воспоминание с заголовком "${deleted.data.title}" было удалено`)
      setCrudedData('delete')
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

  return (
    <>
      {data && (
        <Card className={classes.cardRoot}>
          <CardHeader
            avatar={
              <Avatar
                alt='avatar'
                src={IMAGES_PATH + (data.user.avatar || NO_AVATAR)}
                aria-label='avatar'
                className={classes.avatar}
              />
            }
            title={data.title}
            subheader={data.description}
          />
          <CardMedia
            className={classes.media}
            image={IMAGES_PATH + (data.imgName || NO_IMAGE)}
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
              <Button onClick={() => handleShowCrudForm(false)}>Создать</Button>
              <Button onClick={() => handleShowCrudForm(true)}>Изменить</Button>
              <Button color='secondary' onClick={() => deleteMemory()}>
                Удалить
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      )}

      {data && (
        <Backdrop
          transitionDuration={1000}
          className={classes.backdrop}
          style={{
            background: `url(${
              IMAGES_PATH + (data.imgName || NO_IMAGE)
            }) center/contain no-repeat`,
          }}
          open={backdropOpen}
          onClick={() => setBackdropOpen(false)}
        />
      )}

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
        <DialogContent className={classes.form}>
          <TextField
            required
            error={!formData.title}
            autoFocus
            id='title'
            name='title'
            label='Название'
            fullWidth
            variant='outlined'
            value={formData.title}
            onChange={handleFormChange}
            helperText={!formData.title && 'Не может быть пустым'}
          />
          <TextField
            id='description'
            name='description'
            label='Подробности'
            multiline
            rowsMax={4}
            variant='outlined'
            fullWidth
            value={formData.description}
            onChange={handleFormChange}
          />
          <DropzoneArea
            onChange={handleImageChange}
            dropzoneText='Добавить изображение'
            acceptedFiles={['image/*']}
            filesLimit={1}
            showAlerts={['error']}
            initialFiles={
              formData.imgName ? [IMAGES_PATH + formData.imgName] : []
            }
            dropzoneClass={classes.dropZone}
            dropzoneParagraphClass={classes.dropParagrarh}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              formData.hasOwnProperty('user')
                ? createUpdateMemory(false)
                : createUpdateMemory(true)
            }
            disabled={!formData.title}
            color='primary'
          >
            {formData.hasOwnProperty('user') ? 'Изменить' : 'Создать'}
          </Button>

          <Button onClick={() => setOpen(false)} color='primary'>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
