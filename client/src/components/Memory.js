import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

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
  Grid,
  ButtonGroup,
  Button,
  IconButton,
  Backdrop,
} from '@material-ui/core'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
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
  avatar: {
    backgroundColor: red[500],
  },
  btnGroup: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export const Memory = ({
  memory,
  select,
  createMemory,
  updateMemory,
  handleDeleteBtnClick,
}) => {
  const classes = useStyles()

  const [viewerOpen, setViewerOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const createData = {
    title: '',
    description: '',
    image: undefined,
    shared: false,
  }
  const [formData, setFormData] = useState(createData)

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
      image: files ? files[0] : undefined,
    })
  }

  const handleCreateBtnClick = () => {
    setFormData(createData)
    setFormOpen(true)
  }
  const handleOnCreateMemory = () => {
    setFormOpen(false)
    createMemory(formData)
  }

  const handleUpdateBtnClick = () => {
    setFormData(memory)
    setFormOpen(true)
  }

  const handleOnUpdateMemory = () => {
    setFormOpen(false)
    updateMemory(formData)
  }

  if (!memory) {
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
                      onClick={() => select(null)}
                    >
                      <ClearRoundedIcon />
                    </IconButton>
                  }
                  title={memory.title}
                  subheader={memory.description}
                />
                <CardMedia
                  className={classes.media}
                  image={memory.image}
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
            background: `url(${memory.image}) 0 0/cover no-repeat`,
          }}
          open={viewerOpen}
          onClick={() => setViewerOpen(false)}
        />
        <div>
          <Dialog open={formOpen} aria-labelledby='form-dialog-title'>
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
                dropzoneText='Перетащите картинку сюда'
                acceptedFiles={['image/*']}
                filesLimit={1}
                showAlerts={['error']}
                initialFiles={formData.image ? [formData.image] : []}
              />
            </DialogContent>
            <DialogActions>
              {formData.hasOwnProperty('user') ? (
                <Button onClick={() => handleOnUpdateMemory()} color='primary'>
                  Изменить
                </Button>
              ) : (
                <Button onClick={() => handleOnCreateMemory()} color='primary'>
                  Создать
                </Button>
              )}

              <Button onClick={() => setFormOpen(false)} color='primary'>
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}
