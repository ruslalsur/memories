import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default forwardRef(function FormDialog(props, ref) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    shared: false,
  })

  useEffect(() => {
    console.log(`formData: `, formData)
  }, [formData])

  useImperativeHandle(ref, () => ({
    handleClickOpen: () => {
      setOpen(true)
    },
  }))

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setFormData({ ...formData, [event.target.name]: value })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {props.formCreate ? 'Создание нового ' : 'Изменкние текущего '}
          воспоминания
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='title'
            name='title'
            label='Название'
            type='text'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id='description'
            name='description'
            label='Подробности'
            type='text'
            fullWidth
            onChange={handleChange}
          />
          <input type='file' name='image' placeholder='Добавте изображение' />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.shared}
                onChange={handleChange}
                name='shared'
              />
            }
            label='Воспоминание смогут увидеть остальные'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            {props.formCreate ? 'Создать' : 'Изменить'}
          </Button>
          <Button onClick={handleClose} color='primary'>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})
