import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import MediaCard from './MediaCard'

export const Main = () => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={5}>
        <Typography variant='h5' component='h2' paragraph color='primary'>
          У каждого свои воспоминания.
        </Typography>
        <Typography component='h5' paragraph>
          Здесь каждый сможет хранить свои воспоминания, отдельно от
          воспоминаний остальных, под видом картотеки состоящей из карточек в
          которых могут быть фотографии и связанные с ними высказывания.
        </Typography>
        <Typography component='h5' paragraph>
          Найти нужное воспоминание можно будет указав фразу, которая может быть
          в его описании или названии.
        </Typography>
        <Typography component='h5' paragraph>
          Здесь, для примера, показано одно случайное воспоминание, из набора
          разрешенных пользователями для всеобщего просмотра.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <MediaCard />
      </Grid>
    </Grid>
  )
}
