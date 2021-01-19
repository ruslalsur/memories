import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

export const AuthPage = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Страница авторизации
      </Typography>
      <Box sx={{ my: 4 }}>
        <Link to='/reg'>Регистрация</Link>
      </Box>
    </Box>
  );
};
