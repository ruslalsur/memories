import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
    fontSize: '1.3rem',
  },
}))

export const MemoryCrudForm = ({
  open,
  setOpen,
  data,
  setData,
  handleCreateBntClick,
  handleUpdateBntClick,
}) => {
  const classes = useStyles()

  const handleFormChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setData({ ...data, [event.target.name]: value })
  }

  const handleImageChange = (files) => {
    setData({
      ...data,
      image: files.length ? files[0] : undefined,
    })
  }

  return (
    <Dialog open={open} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        {data.hasOwnProperty('user') ? 'Изменить старое ' : 'Создать новое '}
        воспоминание
      </DialogTitle>
      <DialogContent className={classes.form}>
        <TextField
          required
          error={!data.title}
          autoFocus
          id='title'
          name='title'
          label='Название'
          fullWidth
          variant='outlined'
          value={data.title}
          onChange={handleFormChange}
          helperText={!data.title && 'Не может быть пустым'}
        />
        <TextField
          id='description'
          name='description'
          label='Подробности'
          multiline
          rowsMax={4}
          variant='outlined'
          fullWidth
          value={data.description}
          onChange={handleFormChange}
        />
        <DropzoneArea
          onChange={handleImageChange}
          dropzoneText='Добавить изображение'
          acceptedFiles={['image/*']}
          filesLimit={1}
          showAlerts={['error']}
          initialFiles={data.image ? [data.image] : []}
          dropzoneClass={classes.dropZone}
          dropzoneParagraphClass={classes.dropParagrarh}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.shared}
              onChange={handleFormChange}
              name='shared'
            />
          }
          label='Воспоминание смогут увидеть остальные'
        />
      </DialogContent>
      <DialogActions>
        {data.hasOwnProperty('user') ? (
          <Button
            onClick={() => handleUpdateBntClick()}
            disabled={!data.title}
            color='primary'
          >
            Изменить
          </Button>
        ) : (
          <Button
            onClick={() => handleCreateBntClick()}
            disabled={!data.title}
            color='primary'
          >
            Создать
          </Button>
        )}

        <Button onClick={() => setOpen(false)} color='primary'>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  )
}
