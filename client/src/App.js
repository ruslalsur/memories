import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { MainPage } from './pages/MainPage';
import { AuthPage } from './pages/AuthPage';
import { RegPage } from './pages/RegPage';
import { Navbar } from './components/Navbar';
import { APP_NAME } from './config.js';
import './App.css';

function App() {
  const history = createBrowserHistory()

  return (
    
    <Router history={history}>
      <Navbar appName={APP_NAME} />

      <Switch>
        <Container>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/auth'>
            <AuthPage />
          </Route>
          <Route path='/reg'>
            <RegPage />
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
