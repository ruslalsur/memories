import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IMAGES_PATH, NO_IMAGE } from '../config'
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
    filter: 'grayscale(100%) opacity(80%) sepia(0%)',
    transition: '0.3s ease-in-out',
    '& .MuiGridListTile-tile': {
      borderRadius: 5,
    },
    '&:hover': {
      transform: 'scale(1.03)',
      filter: 'grayscale(0%) opacity(95%) grayscale(20%)',
    },
    '&:active': { transform: 'scale(0.97)' },
  },
}))

export const Memories = ({ memories, select }) => {
  const classes = useStyles()
  const { setInfo } = useContext(Context)

  const handlleMemoryClick = (index) => {
    setInfo(null)
    select(index)
  }

  if (memories.length) {
    return (
      <GridList
        spacing={5}
        cellHeight={145}
        cols={3}
        className={classes.gridList}
      >
        {memories.map((memory, index) => (
          <GridListTile
            key={memory._id}
            onClick={() => handlleMemoryClick(index)}
            className={classes.gridListTile}
          >
            <img
              src={IMAGES_PATH + (memory.imgName || NO_IMAGE)}
              alt={memory.imgName}
            />
            <GridListTileBar title={memory.title} />
          </GridListTile>
        ))}
      </GridList>
    )
  } else {
    return null
  }
}
