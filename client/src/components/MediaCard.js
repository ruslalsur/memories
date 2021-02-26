import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    marginBottom: 10,
  },
  media: {
    height: '50vh',
  },
})

export default function MediaCard(props) {
  const classes = useStyles()
  const { data, cardClickHandler } = props

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardClickHandler()} id={data.user._id}>
        <CardMedia
          className={classes.media}
          image={data.image ?? '/images/memories/noimage.png'}
          title='Sample preview'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h5'>
            {data.title}
          </Typography>
          <Typography variant='body1' color='textSecondary' component='p'>
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
