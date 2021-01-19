import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const MainPage = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Страница приветствия
      </Typography>
    </Box>
  );
};
