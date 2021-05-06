import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DojavaUredi from './components/DojavaUredi';
import dojavaLista from './components/DojavaLista';



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/dojava' exact={true} component={dojavaLista}/>
          <Route path='/dojava/:key' component={DojavaUredi}/>
        </Switch>
      </Router>
    )
  }
}

export default App;