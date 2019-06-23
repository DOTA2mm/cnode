import * as React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Index';
import Home from './views/Home/Index';
import Topic from './views/Topic/Index';
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <HashRouter>
          <div className="box">
            <Route exact path="/" component={Home} />
            <Route path="/topic/:id" component={Topic} />
          </div>
        </HashRouter>
      </div>
    )
  };
}

export default App;
