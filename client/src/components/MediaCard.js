import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { IMGDIR } from '../config'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 350,
  },
})

export default function MediaCard(props) {
  const classes = useStyles()
  const { data, cardClickHandler } = props

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => cardClickHandler()}>
        <CardMedia
          className={classes.media}
          image={`${IMGDIR}/preview/${data.image}`}
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
      <CardActions>
        <Button size='small' color='primary'>
          Изменить
        </Button>
      </CardActions>
    </Card>
  )
}
