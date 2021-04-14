import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputAdornment } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { blueGrey } from '@material-ui/core/colors'
import ClearIcon from '@material-ui/icons/Clear'
import { Context } from '../context'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 250,
    backgroundColor: blueGrey[200],
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}))

export const Search = () => {
  const classes = useStyles()
  const { search, setSearch } = useContext(Context)

  const handleOnChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClickClear = () => {
    setSearch('')
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.input}
        placeholder='Поиск воспоминаний'
        inputProps={{ 'aria-label': 'search for memories' }}
        value={search}
        onChange={handleOnChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              size='small'
              aria-label='clear'
              onClick={handleClickClear}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Paper>
  )
}
