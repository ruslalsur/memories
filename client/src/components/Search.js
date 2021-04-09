import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputAdornment } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { teal } from '@material-ui/core/colors'
import ClearIcon from '@material-ui/icons/Clear'
import { Context } from '../context'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 250,
    backgroundColor: teal[100],
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}))

export const Search = () => {
  const classes = useStyles()
  // const [value, setValue] = useState('')
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
        type='search'
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
      {/* <IconButton
        className={classes.iconButton}
        aria-label='search'
        size='small'
        onClick={() => setSearch(value)}
      >
        <SearchIcon />
      </IconButton> */}
    </Paper>
  )
}
