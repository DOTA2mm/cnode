import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Index';
import Home from './views/Home/Index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <HashRouter>
          <div className="box">
            <Route exact path="/" component={Home} />
          </div>
        </HashRouter>
      </div>
    )
  };
}

export default App;
