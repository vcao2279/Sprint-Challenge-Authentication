import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/Login';
import Jokes from './components/Jokes';
import Registration from './components/Registration';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Switch>
              <Route path='/login' component={LoginForm} />
              <Route path='/register' component={Registration} />
              <Route path='/jokes' component={Jokes} />
              <Redirect to='/jokes' />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
