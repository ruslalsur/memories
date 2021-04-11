import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IMAGES_PATH } from '../config'
import noimage from '../assets/images/noimage.jpg'
import LockIcon from '@material-ui/icons/Lock'
import { deepOrange } from '@material-ui/core/colors'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import { Context } from '../context'

const useStyles = makeStyles((theme) => ({
  root: {},

  gridList: {
    width: 'auto',
    height: 'auto%',
    padding: 7,
  },

  gridListTile: {
    overflow: 'hidden',
    cursor: 'pointer',
    opacity: 0.9,
    transition: '0.2s ease-in-out',
    '& .MuiGridListTile-tile': {
      borderRadius: 5,
    },
    '&:hover': {
      transform: 'scale(1.03)',
    },
    '&:active': { transform: 'scale(0.97)', cursor: 'grabbing' },
  },
  icon: {
    marginRight: 10,
  },
}))

export const Memories = ({ memories, select, current }) => {
  const classes = useStyles()
  const { setInfo } = useContext(Context)

  const handlleMemoryClick = (index) => {
    setInfo(null)
    select(index)
  }

  if (memories.length) {
    return (
      <GridList
        spacing={10}
        cellHeight={145}
        cols={3}
        className={classes.gridList}
      >
        {memories.map((memory, index) => (
          <GridListTile
            key={memory._id}
            onClick={() => handlleMemoryClick(index)}
            className={classes.gridListTile}
            style={
              memories[current]._id === memory._id && {
                opacity: 1,
                boxShadow: `inset 0 0 0 3px ${deepOrange['A400']}`,
                borderRadius: 7,
              }
            }
          >
            <img
              src={memory.imgName ? IMAGES_PATH + memory.imgName : noimage}
              alt={memory.imgName ? IMAGES_PATH + memory.imgName : noimage}
            />

            <GridListTileBar
              title={memory.title}
              actionIcon={
                !memory.shared && (
                  <LockIcon
                    fontSize='small'
                    color='error'
                    className={classes.icon}
                  />
                )
              }
            />
          </GridListTile>
        ))}
      </GridList>
    )
  } else {
    return null
  }
}
