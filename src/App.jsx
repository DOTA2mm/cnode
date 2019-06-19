import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    )
  };
}

export default App;
