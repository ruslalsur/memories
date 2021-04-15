import React from 'react'
import { Box, Typography, CircularProgress } from '@material-ui/core'

export const MemoriesIndicator = (props) => {
  if (!props?.value) return null
  return (
    <Box ml={1} position='relative' display='inline-flex'>
      <CircularProgress
        variant='static'
        value={props.value}
        color={props.color}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='caption'
          component='div'
          color={props.color}
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  )
}
