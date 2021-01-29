import React from 'react';
import { Grid } from '@material-ui/core';
import { RegForm } from '../components/RegForm'

export const RegPage = () => {
  return (
    <Grid
    container
    spacing={0}
    direction='row'
    justify='center'
    alignItems='center'
    alignContent='center'
    wrap='nowrap'
  >
    <RegForm regRoute='/reg' />
  </Grid>
  );
};
