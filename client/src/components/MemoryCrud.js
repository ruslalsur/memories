import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../context'
import { DropzoneArea } from 'material-ui-dropzone'
import { useStorage } from '../hooks/storage.hook'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { IMAGES_PATH, UPLOAD_FILE_SIZE, UPLOAD_FILE_SIZE_VIP } from '../config'
import noavatar from '../assets/images/noavatar.jpg'
import noimage from '../assets/images/noimage.jpg'
import {
  Box,
  Typography,
  Tooltip,
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
  LinearProgress,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: '100%',
  },
  media: {
    height: '400px',
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
    opacity: 1,
    transition: '0.3s ease-in-out',
    '&:hover': {
      opacity: 0.8,
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
  dropZone: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
  dropParagrarh: {
    color: '#555',
    fontSize: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem',
  },
}))

export const MemoryCrud = ({ data, setCrudedData }) => {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress)

  const classes = useStyles()
  const { uploadImage } = useStorage()
  const initFormData = {
    title: '',
    description: '',
    imgName: '',
    shared: true,
  }

  const [loading, setLoading] = useState(false)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initFormData)
  const [imgFile, setImgFile] = useState(undefined)
  const { token, setInfo, authorizedUser, search } = useContext(Context)
  const maxUploadImageSize = authorizedUser?.roles.some(
    (item) => item.role === 'PHOTO'
  )
    ? UPLOAD_FILE_SIZE_VIP
    : UPLOAD_FILE_SIZE

  useEffect(() => {
    if (!data) {
      setFormData(initFormData)
      if (!search) setOpen(true)
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
    if (!files.length) {
      setImgFile(undefined)
      setFormData({
        ...formData,
        imgName: '',
      })
    } else if (files.length && files[0].size <= maxUploadImageSize) {
      setImgFile(files[0])
      setFormData({
        ...formData,
        imgName: files[0].name,
      })
    } else {
      if (files.length && files[0].size > maxUploadImageSize) {
        setInfo({
          type: 'warning',
          msg: `Размер картинки превышен на ${
            files[0].size - maxUploadImageSize
          } байт`,
        })
      }
    }
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

    try {
      setLoading(true)
      let newState = { ...formData, user: authorizedUser }

      if (formData.imgName) {
        const uploadedImgName = await uploadImage(imgFile)
        newState.imgName = uploadedImgName
      }

      let todo = 'создано'
      if (isCreate) {
        const response = await axios.post(`/api/memory`, newState, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCrudedData('create', response.data)
      } else {
        await axios.patch(`/api/memory/${formData._id}`, newState, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCrudedData('update', newState)
        todo = 'изменено'
      }

      setInfo({
        type: 'success',
        msg: `Воспоминание с заголовком "${newState.title}" было ${todo}`,
      })
      setLoading(false)
    } catch (err) {
      if (err.response) {
        setInfo({ type: 'error', msg: err.response.data.message })
      } else {
        setInfo({ type: 'error', msg: err.message })
      }
      setLoading(false)
    }
  }

  const deleteMemory = async () => {
    setInfo(null)

    try {
      setLoading(true)
      const deleted = await axios.delete(`/api/memory/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setInfo({
        type: 'success',
        msg: `Воспоминание с заголовком "${deleted.data.title}" было удалено`,
      })

      setCrudedData('delete')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setInfo({ type: 'error', msg: err.response.data.message || 'ой' })
    }
  }

  return (
    <>
      {data && (
        <>
          <Card className={classes.cardRoot}>
            <CardHeader
              avatar={
                <Avatar
                  alt={data?.user?.username.toUpperCase()}
                  src={
                    data?.user?.avatar
                      ? IMAGES_PATH + data?.user?.avatar
                      : noavatar
                  }
                  aria-label='avatar'
                  className={classes.avatar}
                />
              }
              title={data.title}
              subheader={data.description}
            />
            <Tooltip
              title={<Typography variant='body1'>Крупнее</Typography>}
              placement='bottom'
            >
              <CardMedia
                className={classes.media}
                image={data.imgName ? IMAGES_PATH + data.imgName : noimage}
                onClick={() => setBackdropOpen(true)}
              />
            </Tooltip>

            <CardActions disableSpacing>
              <ButtonGroup
                className={classes.btnGroup}
                color='primary'
                size='small'
                aria-label='outlined primary button group'
              >
                <Button
                  disabled={authorizedUser?._id !== data.user._id}
                  onClick={() => handleShowCrudForm(false)}
                >
                  Создать
                </Button>
                <Button
                  disabled={authorizedUser?._id !== data.user._id}
                  onClick={() => handleShowCrudForm(true)}
                >
                  Изменить
                </Button>
                <Button
                  disabled={
                    authorizedUser?._id !== data.user._id &&
                    authorizedUser?.username !== 'admin'
                  }
                  color='secondary'
                  onClick={() => deleteMemory()}
                >
                  Удалить
                </Button>
              </ButtonGroup>
              {loading && (
                <Box width='100%' px={5}>
                  <BorderLinearProgress />
                </Box>
              )}
            </CardActions>
          </Card>

          <Backdrop
            transitionDuration={1000}
            className={classes.backdrop}
            style={{
              background: `url(${
                data?.imgName ? IMAGES_PATH + data?.imgName : noimage
              }) center/contain no-repeat`,
            }}
            open={backdropOpen}
            onClick={() => setBackdropOpen(false)}
          />
        </>
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
            dropzoneText={`Изображение (до ${maxUploadImageSize} байт)`}
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
              formData?.user
                ? createUpdateMemory(false)
                : createUpdateMemory(true)
            }
            disabled={!formData.title}
            color='primary'
          >
            {formData?.user ? 'Изменить' : 'Создать'}
          </Button>

          <Button onClick={() => setOpen(false)} color='primary'>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
